'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyUserIsTeacher } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
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
                value={groupSize}
                onChange={(e) => setGroupSize(parseInt(e.target.value))}
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