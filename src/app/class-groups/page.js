'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyUserIsTeacher } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const FUNNY_GROUP_NAMES = [
  {
    name: "The Pythonistas",
    color: "#4B8BBE" // Python blue
  },
  {
    name: "Indentation Nation",
    color: "#306998" // Dark Python blue
  },
  {
    name: "List Comprehenders",
    color: "#FFE873" // Python yellow
  },
  {
    name: "Exception Handlers",
    color: "#FF6B6B" // Soft red
  },
  {
    name: "Dictionary Divers",
    color: "#4CAF50" // Material green
  },
  {
    name: "Tuple Trouble",
    color: "#9B59B6" // Purple
  },
  {
    name: "String Theory Squad",
    color: "#FFB900" // Warm yellow
  },
  {
    name: "Boolean Bandits",
    color: "#00BCD4" // Cyan
  },
  {
    name: "Lambda Lions",
    color: "#FF5722" // Deep orange
  },
  {
    name: "Variable Vikings",
    color: "#2196F3" // Blue
  },
  {
    name: "Function Fanatics",
    color: "#E91E63" // Pink
  },
  {
    name: "Loop Legends",
    color: "#8BC34A" // Light green
  },
  {
    name: "Module Mavericks",
    color: "#3F51B5" // Indigo
  },
  {
    name: "Algorithm Alchemists",
    color: "#F44336" // Red
  },
  {
    name: "Debug Dragons",
    color: "#009688" // Teal
  },
  {
    name: "Syntax Sugar Rush",
    color: "#FF4081" // Pink accent
  },
  {
    name: "Git Commit Crew",
    color: "#795548" // Brown
  },
  {
    name: "Stack Overflow Society",
    color: "#FF9800" // Orange
  },
  {
    name: "Recursion Rebels",
    color: "#607D8B" // Blue grey
  },
  {
    name: "Pandas Paradise",
    color: "#673AB7" // Deep purple
  }
]

export default function ClassGroupsPage() {
  const [groupSize, setGroupSize] = useState(3)
  const [groups, setGroups] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTeacher, setIsTeacher] = useState(false)
  const [savedGroups, setSavedGroups] = useState([])
  const router = useRouter()

  useEffect(() => {
    const checkTeacherStatus = async () => {
      try {
        const isTeacherUser = await verifyUserIsTeacher('1234') // Using same password as in auth.js
        setIsTeacher(isTeacherUser)
        if (!isTeacherUser) {
          toast.error('Access denied. Teacher access required.')
          router.push('/')
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error verifying teacher status:', error)
        setIsLoading(false)
        router.push('/')
      }
    }
    checkTeacherStatus()
  }, [router])

  // Load all students when component mounts
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'))
        const students = []
        
        usersSnapshot.forEach(doc => {
          const data = doc.data()
          if (data.user_type === 'student') {
            students.push({
              id: doc.id,
              name: data.name,
              quizScore: data.overallQuizScore || 0
            })
          }
        })

        // Sort students by name
        students.sort((a, b) => a.name.localeCompare(b.name))
        setAllStudents(students)
      } catch (error) {
        console.error('Error loading students:', error)
        toast.error('Failed to load students')
      }
    }

    if (isTeacher) {
      loadStudents()
    }
  }, [isTeacher])

  // Load saved groups
  useEffect(() => {
    const loadSavedGroups = async () => {
      try {
        const savedGroupsRef = collection(db, 'savedGroups')
        const q = query(savedGroupsRef, orderBy('timestamp', 'desc'), limit(5))
        const snapshot = await getDocs(q)
        const groups = []
        snapshot.forEach(doc => {
          groups.push({ id: doc.id, ...doc.data() })
        })
        setSavedGroups(groups)
      } catch (error) {
        console.error('Error loading saved groups:', error)
        toast.error('Failed to load saved groups')
      }
    }

    if (isTeacher) {
      loadSavedGroups()
    }
  }, [isTeacher])

  const generateGroups = async () => {
    try {
      setIsLoading(true)
      // Sort students by quiz score (descending)
      const sortedStudents = [...allStudents].sort((a, b) => b.quizScore - a.quizScore)

      // Calculate number of groups
      const numGroups = Math.ceil(sortedStudents.length / groupSize)
      const newGroups = Array.from({ length: numGroups }, () => [])

      // Shuffle group names
      const shuffledNames = [...FUNNY_GROUP_NAMES]
        .sort(() => Math.random() - 0.5)
        .slice(0, numGroups)

      // Distribute high scorers first (one per group)
      for (let i = 0; i < numGroups && i < sortedStudents.length; i++) {
        newGroups[i].push(sortedStudents[i])
      }

      // Distribute remaining students evenly
      const remainingStudents = sortedStudents.slice(numGroups)
      let currentGroupIndex = 0

      for (const student of remainingStudents) {
        // Find group with fewest members
        const minGroupSize = Math.min(...newGroups.map(g => g.length))
        const targetGroup = newGroups.findIndex(g => g.length === minGroupSize)
        newGroups[targetGroup].push(student)
        currentGroupIndex = (currentGroupIndex + 1) % numGroups
      }

      // Add group names to the groups
      const groupsWithNames = newGroups.map((group, index) => ({
        name: shuffledNames[index].name,
        color: shuffledNames[index].color,
        members: group
      }))

      setGroups(groupsWithNames)
      setIsLoading(false)
    } catch (error) {
      console.error('Error generating groups:', error)
      toast.error('Failed to generate groups')
      setIsLoading(false)
    }
  }

  // Helper function to check if a student is assigned to any group
  const isStudentAssigned = (studentId) => {
    return groups.some(group => group.members.some(student => student.id === studentId))
  }

  const saveCurrentGroups = async () => {
    try {
      if (groups.length === 0) {
        toast.error('No groups to save')
        return
      }

      const timestamp = new Date()
      const savedGroupData = {
        groups,
        timestamp,
        groupSize
      }

      await addDoc(collection(db, 'savedGroups'), savedGroupData)
      
      // Refresh saved groups
      const savedGroupsRef = collection(db, 'savedGroups')
      const q = query(savedGroupsRef, orderBy('timestamp', 'desc'), limit(5))
      const snapshot = await getDocs(q)
      const updatedGroups = []
      snapshot.forEach(doc => {
        updatedGroups.push({ id: doc.id, ...doc.data() })
      })
      setSavedGroups(updatedGroups)
      
      toast.success('Groups saved successfully')
    } catch (error) {
      console.error('Error saving groups:', error)
      toast.error('Failed to save groups')
    }
  }

  const formatDate = (timestamp) => {
    const date = timestamp.toDate()
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const loadSavedGroup = (savedGroup) => {
    setGroups(savedGroup.groups)
    setGroupSize(savedGroup.groupSize)
    toast.success('Groups loaded successfully')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!isTeacher) {
    return null // Router will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="text-3xl font-bold mb-8"
        style={{
          background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Class Groups
      </h1>

      {/* Saved Groups Panel - Now at the top */}
      <div 
        className="mb-8 p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--card-background)',
          borderColor: 'var(--card-border)',
          border: '1px solid'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Saved Groups
          </h2>
          {groups.length > 0 && (
            <button
              onClick={saveCurrentGroups}
              className="text-sm px-3 py-1 rounded"
              style={{
                backgroundColor: 'var(--text-accent)',
                color: 'var(--color-dark)'
              }}
            >
              Save Current
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {savedGroups.map((saved) => (
            <div
              key={saved.id}
              className="text-sm p-3 rounded cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--card-background-secondary)',
                border: '1px solid var(--card-border)'
              }}
              onClick={() => loadSavedGroup(saved)}
            >
              <div style={{ color: 'var(--text-secondary)' }}>
                {formatDate(saved.timestamp)}
              </div>
              <div 
                className="mt-1 flex justify-between items-center"
              >
                <span style={{ color: 'var(--text-primary)' }}>
                  {saved.groups.length} groups, {saved.groupSize} students per group
                </span>
                <button
                  className="text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{
                    backgroundColor: 'var(--text-accent)',
                    color: 'var(--color-dark)'
                  }}
                >
                  Load
                </button>
              </div>
            </div>
          ))}
          {savedGroups.length === 0 && (
            <div 
              className="text-sm col-span-full text-center py-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              No saved groups yet
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left side: Controls and Student List */}
        <div className="lg:col-span-1">
          <div className="mb-8">
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Students per group:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="2"
                max="10"
                value={groupSize || ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? '' : parseInt(e.target.value)
                  setGroupSize(value === '' ? 3 : value)
                }}
                className="w-24 px-3 py-2 rounded-md"
                style={{
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--card-border)',
                  border: '1px solid'
                }}
              />
              <button
                onClick={generateGroups}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor: 'var(--text-accent)',
                  color: 'var(--color-dark)',
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                Generate Groups
              </button>
            </div>
          </div>

          {/* Student List */}
          <div 
            className="p-4 rounded-lg"
            style={{
              backgroundColor: 'var(--card-background)',
              borderColor: 'var(--card-border)',
              border: '1px solid'
            }}
          >
            <h2 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              All Students ({allStudents.length})
            </h2>
            <ul className="space-y-2">
              {allStudents.map((student) => (
                <li
                  key={student.id}
                  className="flex items-center"
                  style={{ 
                    color: 'var(--text-primary)',
                    textDecoration: isStudentAssigned(student.id) ? 'line-through' : 'none',
                    opacity: isStudentAssigned(student.id) ? 0.5 : 1
                  }}
                >
                  {student.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side: Groups Display */}
        <div className="lg:col-span-3">
          {groups.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    borderColor: group.color,
                    border: '2px solid',
                    boxShadow: `0 4px 6px -1px ${group.color}20`
                  }}
                >
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <h2 
                        className="text-xl font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Group {index + 1}
                      </h2>
                      <span
                        className="text-sm px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: group.color,
                          color: '#FFFFFF'
                        }}
                      >
                        {group.members.length} students
                      </span>
                    </div>
                    <h3 
                      className="text-lg italic"
                      style={{ 
                        color: group.color,
                        fontWeight: 600
                      }}
                    >
                      "{group.name}"
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {group.members.map((student) => (
                      <li
                        key={student.id}
                        className="flex items-center"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: group.color }}
                        />
                        {student.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 