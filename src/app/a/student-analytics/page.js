"use client";
import { useState, useMemo } from 'react'
import Head from 'next/head'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Award, Target, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

export default function StudentAnalyticsDashboard() {
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [expandedSection, setExpandedSection] = useState(null)

  // Student data
  const studentData = {
    "Rashtrasant Tukadoji Maharaj Vidyalaya": {
      "Class 6": [
        { "id": 1, "name": "Aarush Bhagwat", "rollNo": "06001", "pretestMarks": 43, "posttestMarks": 69 },
        { "id": 2, "name": "Aishwarya Deshpande", "rollNo": "06002", "pretestMarks": 36, "posttestMarks": 62 },
        { "id": 3, "name": "Akash Jadhav", "rollNo": "06003", "pretestMarks": 50, "posttestMarks": 76 },
        { "id": 4, "name": "Amrita Kulkarni", "rollNo": "06004", "pretestMarks": 39, "posttestMarks": 66 },
        { "id": 5, "name": "Arjun Joshi", "rollNo": "06005", "pretestMarks": 45, "posttestMarks": 71 },
        { "id": 6, "name": "Bhavani Pawar", "rollNo": "06006", "pretestMarks": 33, "posttestMarks": 59 },
        { "id": 7, "name": "Chintan Bhosale", "rollNo": "06007", "pretestMarks": 47, "posttestMarks": 74 },
        { "id": 8, "name": "Dhruv Mane", "rollNo": "06008", "pretestMarks": 40, "posttestMarks": 66 },
        { "id": 9, "name": "Eesha Shinde", "rollNo": "06009", "pretestMarks": 42, "posttestMarks": 69 },
        { "id": 10, "name": "Gargi Patil", "rollNo": "06010", "pretestMarks": 37, "posttestMarks": 62 },
        { "id": 11, "name": "Harsh Gaikwad", "rollNo": "06011", "pretestMarks": 44, "posttestMarks": 72 },
        { "id": 12, "name": "Ishani More", "rollNo": "06012", "pretestMarks": 38, "posttestMarks": 65 },
        { "id": 13, "name": "Kiran Sawant", "rollNo": "06013", "pretestMarks": 46, "posttestMarks": 73 },
        { "id": 14, "name": "Lavanya Kale", "rollNo": "06014", "pretestMarks": 34, "posttestMarks": 60 },
        { "id": 15, "name": "Mayur Chavan", "rollNo": "06015", "pretestMarks": 41, "posttestMarks": 68 },
        { "id": 16, "name": "Nandini Mane", "rollNo": "06016", "pretestMarks": 35, "posttestMarks": 61 },
        { "id": 17, "name": "Pranav Tambe", "rollNo": "06017", "pretestMarks": 48, "posttestMarks": 75 }
      ],
      "Class 7": [
        { "id": 1, "name": "Advik Lokhande", "rollNo": "07001", "pretestMarks": 49, "posttestMarks": 75 },
        { "id": 2, "name": "Ananya Marathe", "rollNo": "07002", "pretestMarks": 46, "posttestMarks": 72 },
        { "id": 3, "name": "Arihan Gupta", "rollNo": "07003", "pretestMarks": 53, "posttestMarks": 79 },
        { "id": 4, "name": "Bhumi Thakur", "rollNo": "07004", "pretestMarks": 44, "posttestMarks": 70 },
        { "id": 5, "name": "Devansh Deshpande", "rollNo": "07005", "pretestMarks": 49, "posttestMarks": 75 },
        { "id": 6, "name": "Dia Mahajan", "rollNo": "07006", "pretestMarks": 42, "posttestMarks": 68 },
        { "id": 7, "name": "Gautam Aggarwal", "rollNo": "07007", "pretestMarks": 51, "posttestMarks": 77 },
        { "id": 8, "name": "Heet Pandit", "rollNo": "07008", "pretestMarks": 45, "posttestMarks": 71 },
        { "id": 9, "name": "Ishika Fadnavis", "rollNo": "07009", "pretestMarks": 47, "posttestMarks": 73 },
        { "id": 10, "name": "Jiya Kamat", "rollNo": "07010", "pretestMarks": 43, "posttestMarks": 69 },
        { "id": 11, "name": "Kunal Sane", "rollNo": "07011", "pretestMarks": 48, "posttestMarks": 74 },
        { "id": 12, "name": "Lalit Gokhale", "rollNo": "07012", "pretestMarks": 41, "posttestMarks": 67 },
        { "id": 13, "name": "Manas Kulkarni", "rollNo": "07013", "pretestMarks": 50, "posttestMarks": 76 },
        { "id": 14, "name": "Neha Shirke", "rollNo": "07014", "pretestMarks": 39, "posttestMarks": 65 },
        { "id": 15, "name": "Prachi Tendulkar", "rollNo": "07015", "pretestMarks": 46, "posttestMarks": 72 },
        { "id": 16, "name": "Rishi Moghe", "rollNo": "07016", "pretestMarks": 42, "posttestMarks": 68 },
        { "id": 17, "name": "Saanvi Paranjpe", "rollNo": "07017", "pretestMarks": 52, "posttestMarks": 78 }
      ],
      "Class 8": [
        { "id": 1, "name": "Ahaan Kadam", "rollNo": "08001", "pretestMarks": 57, "posttestMarks": 83 },
        { "id": 2, "name": "Anvi Mehta", "rollNo": "08002", "pretestMarks": 53, "posttestMarks": 79 },
        { "id": 3, "name": "Arnav Singh", "rollNo": "08003", "pretestMarks": 60, "posttestMarks": 86 },
        { "id": 4, "name": "Bela Khanna", "rollNo": "08004", "pretestMarks": 51, "posttestMarks": 77 },
        { "id": 5, "name": "Cyrus Tandon", "rollNo": "08005", "pretestMarks": 56, "posttestMarks": 82 },
        { "id": 6, "name": "Disha Batra", "rollNo": "08006", "pretestMarks": 49, "posttestMarks": 75 },
        { "id": 7, "name": "Evan Ahuja", "rollNo": "08007", "pretestMarks": 58, "posttestMarks": 84 },
        { "id": 8, "name": "Falak Chabra", "rollNo": "08008", "pretestMarks": 52, "posttestMarks": 78 },
        { "id": 9, "name": "Gatik Dhillon", "rollNo": "08009", "pretestMarks": 54, "posttestMarks": 80 },
        { "id": 10, "name": "Hina Gill", "rollNo": "08010", "pretestMarks": 50, "posttestMarks": 76 },
        { "id": 11, "name": "Ishir Lamba", "rollNo": "08011", "pretestMarks": 55, "posttestMarks": 81 },
        { "id": 12, "name": "Jiana Puri", "rollNo": "08012", "pretestMarks": 48, "posttestMarks": 74 },
        { "id": 13, "name": "Kabir Sehgal", "rollNo": "08013", "pretestMarks": 57, "posttestMarks": 83 },
        { "id": 14, "name": "Lina Sodhi", "rollNo": "08014", "pretestMarks": 46, "posttestMarks": 72 },
        { "id": 15, "name": "Manik Bedi", "rollNo": "08015", "pretestMarks": 53, "posttestMarks": 79 },
        { "id": 16, "name": "Mira Chadha", "rollNo": "08016", "pretestMarks": 49, "posttestMarks": 75 },
        { "id": 17, "name": "Neel Anand", "rollNo": "08017", "pretestMarks": 59, "posttestMarks": 85 },
        { "id": 18, "name": "Oni Kashyap", "rollNo": "08018", "pretestMarks": 51, "posttestMarks": 77 },
        { "id": 19, "name": "Param Mehra", "rollNo": "08019", "pretestMarks": 54, "posttestMarks": 80 },
        { "id": 20, "name": "Ria Oberoi", "rollNo": "08020", "pretestMarks": 47, "posttestMarks": 73 },
        { "id": 21, "name": "Samar Saini", "rollNo": "08021", "pretestMarks": 56, "posttestMarks": 82 },
        { "id": 22, "name": "Tara Sandhu", "rollNo": "08022", "pretestMarks": 52, "posttestMarks": 78 },
        { "id": 23, "name": "Uday Vohra", "rollNo": "08023", "pretestMarks": 55, "posttestMarks": 81 }
      ]
    }
  }

  // Calculate analytics
  const analytics = useMemo(() => {
    const allStudents = Object.values(studentData["Rashtrasant Tukadoji Maharaj Vidyalaya"]).flat()
    const filteredStudents = selectedClass === 'All Classes' 
      ? allStudents 
      : studentData["Rashtrasant Tukadoji Maharaj Vidyalaya"][selectedClass] || []

    const totalStudents = filteredStudents.length
    const avgPretest = filteredStudents.reduce((sum, s) => sum + s.pretestMarks, 0) / totalStudents
    const avgPosttest = filteredStudents.reduce((sum, s) => sum + s.posttestMarks, 0) / totalStudents
    const avgImprovement = ((avgPosttest - avgPretest) / avgPretest * 100)

    // Class-wise performance
    const classPerformance = Object.entries(studentData["Rashtrasant Tukadoji Maharaj Vidyalaya"]).map(([className, students]) => {
      const classAvgPre = students.reduce((sum, s) => sum + s.pretestMarks, 0) / students.length
      const classAvgPost = students.reduce((sum, s) => sum + s.posttestMarks, 0) / students.length
      return {
        class: className,
        pretest: Math.round(classAvgPre),
        posttest: Math.round(classAvgPost),
        improvement: Math.round(((classAvgPost - classAvgPre) / classAvgPre * 100))
      }
    })

    // Performance distribution
    const performanceRanges = [
      { name: 'Below 50', count: 0, color: '#ef4444' },
      { name: '50-60', count: 0, color: '#f97316' },
      { name: '61-70', count: 0, color: '#eab308' },
      { name: '71-80', count: 0, color: '#22c55e' },
      { name: 'Above 80', count: 0, color: '#3b82f6' }
    ]

    filteredStudents.forEach(student => {
      if (student.posttestMarks < 50) performanceRanges[0].count++
      else if (student.posttestMarks <= 60) performanceRanges[1].count++
      else if (student.posttestMarks <= 70) performanceRanges[2].count++
      else if (student.posttestMarks <= 80) performanceRanges[3].count++
      else performanceRanges[4].count++
    })

    // Top and bottom performers
    const sortedByImprovement = [...filteredStudents].sort((a, b) => 
      (b.posttestMarks - b.pretestMarks) - (a.posttestMarks - a.pretestMarks)
    )
    const topPerformers = sortedByImprovement.slice(0, 5)
    const needsAttention = sortedByImprovement.slice(-5).reverse()

    // Scatter plot data
    const scatterData = filteredStudents.map(student => ({
      x: student.pretestMarks,
      y: student.posttestMarks,
      name: student.name,
      improvement: student.posttestMarks - student.pretestMarks
    }))

    return {
      totalStudents,
      avgPretest: Math.round(avgPretest),
      avgPosttest: Math.round(avgPosttest),
      avgImprovement: Math.round(avgImprovement),
      classPerformance,
      performanceRanges,
      topPerformers,
      needsAttention,
      scatterData
    }
  }, [selectedClass])

  const StatCard = ({ title, value, icon: Icon, subtitle, color = "blue" }) => (
    <div className={`bg-white rounded-lg p-6 shadow-lg border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`h-12 w-12 text-${color}-500`} />
      </div>
    </div>
  )

  const Section = ({ title, children, id }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {expandedSection === id ? <ChevronUp /> : <ChevronDown />}
      </button>
      {expandedSection === id && <div className="mt-4">{children}</div>}
    </div>
  )

  return (
    <>
      <Head>
        <title>Student Performance Analytics - NGO Dashboard</title>
        <meta name="description" content="Analytics dashboard for NGO educational impact assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Performance Analytics</h1>
            <p className="text-lg text-gray-600">Rashtrasant Tukadoji Maharaj Vidyalaya</p>
            <p className="text-sm text-gray-500 mt-1">NGO Educational Impact Assessment</p>
          </div>

          {/* Class Filter */}
          <div className="mb-6 flex justify-center">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All Classes">All Classes</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
            </select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={analytics.totalStudents}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Average Pre-test"
              value={analytics.avgPretest}
              icon={BookOpen}
              subtitle="out of 100"
              color="orange"
            />
            <StatCard
              title="Average Post-test"
              value={analytics.avgPosttest}
              icon={Target}
              subtitle="out of 100"
              color="green"
            />
            <StatCard
              title="Average Improvement"
              value={`${analytics.avgImprovement}%`}
              icon={TrendingUp}
              color="purple"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Class-wise Performance */}
            <Section title="Class-wise Performance Comparison" id="classwise">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.classPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pretest" fill="#ef4444" name="Pre-test Average" />
                  <Bar dataKey="posttest" fill="#22c55e" name="Post-test Average" />
                </BarChart>
              </ResponsiveContainer>
            </Section>

            {/* Performance Distribution */}
            <Section title="Post-test Score Distribution" id="distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.performanceRanges}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, count }) => `${name}: ${count}`}
                  >
                    {analytics.performanceRanges.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Section>
          </div>

          {/* Improvement Trend */}
          <Section title="Individual Improvement Analysis" id="improvement">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={analytics.scatterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Pre-test" unit=" marks" />
                <YAxis dataKey="y" name="Post-test" unit=" marks" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border rounded shadow">
                          <p className="font-semibold">{data.name}</p>
                          <p>Pre-test: {data.x}</p>
                          <p>Post-test: {data.y}</p>
                          <p>Improvement: +{data.improvement}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter dataKey="y" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-gray-600">
              <p>• Each dot represents a student's pre-test vs post-test performance</p>
              <p>• Points above the diagonal line show improvement</p>
            </div>
          </Section>

          {/* Student Performance Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Section title="Top 5 Improved Students" id="top">
              <div className="space-y-3">
                {analytics.topPerformers.map((student, index) => (
                  <div key={student.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-bold">+{student.posttestMarks - student.pretestMarks}</p>
                      <p className="text-sm text-gray-600">{student.pretestMarks} → {student.posttestMarks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Students Needing Attention */}
            <Section title="Students Needing Extra Support" id="attention">
              <div className="space-y-3">
                {analytics.needsAttention.map((student, index) => (
                  <div key={student.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-bold">+{student.posttestMarks - student.pretestMarks}</p>
                      <p className="text-sm text-gray-600">{student.pretestMarks} → {student.posttestMarks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Key Insights */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Insights & Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Positive Outcomes:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Overall {analytics.avgImprovement}% improvement across all students</li>
                  <li>• All classes showing positive growth trajectory</li>
                  <li>• Strong performance in post-test assessments</li>
                  <li>• Consistent improvement pattern across grade levels</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Action Items:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Provide additional support to low-improvement students</li>
                  <li>• Replicate successful teaching methods across classes</li>
                  <li>• Focus on students scoring below 60 in post-tests</li>
                  <li>• Continue monitoring progress through regular assessments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


