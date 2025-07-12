"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Hardcoded data for Maharashtrian schools (without marks)
const SCHOOLS_DATA = {
  "Shivaji Vidyalaya": {
    "Class 6": [
      { id: 1, name: "Aarav Patil", rollNo: "06001" },
      { id: 2, name: "Ananya Deshmukh", rollNo: "06002" },
      { id: 3, name: "Arjun Kulkarni", rollNo: "06003" },
      { id: 4, name: "Avani Shah", rollNo: "06004" },
      { id: 5, name: "Devika Joshi", rollNo: "06005" },
      // ...add more students as needed
    ],
    "Class 7": [
      { id: 1, name: "Aditya Marathe", rollNo: "07001" },
      { id: 2, name: "Anjali Iyer", rollNo: "07002" },
      // ...add more students as needed
    ],
    "Class 8": [
      { id: 1, name: "Abhishek Kulkarni", rollNo: "08001" },
      { id: 2, name: "Aditi Joshi", rollNo: "08002" },
      // ...add more students as needed
    ],
  },
  "Rashtrasant Tukadoji Maharaj Vidyalaya": {
    "Class 6": [
      { id: 1, name: "Aarush Bhagwat", rollNo: "06001" },
      // ...add more students as needed
    ],
    "Class 7": [
      { id: 1, name: "Advik Lokhande", rollNo: "07001" },
      // ...add more students as needed
    ],
    "Class 8": [
      { id: 1, name: "Arush Khot", rollNo: "08001" },
      // ...add more students as needed
    ],
  },
  "Chhatrapati Shivaji High School": {
    "Class 6": [
      { id: 1, name: "Atharv Datar", rollNo: "06001" },
      // ...add more students as needed
    ],
    "Class 7": [
      { id: 1, name: "Avni Khadilkar", rollNo: "07001" },
      // ...add more students as needed
    ],
    "Class 8": [
      { id: 1, name: "Ayush Ghodke", rollNo: "08001" },
      // ...add more students as needed
    ],
  },
};

const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Marathi",
  "Hindi",
  "Social Studies",
  "Drawing",
  "Physical Education",
];

export default function AttendancePage() {
  const router = useRouter(); // 👈 ADD THIS

  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [marks, setMarks] = useState({});
  const [showStudentList, setShowStudentList] = useState(false);
const handleGetAnalytics = () => {
  const studentAnalyticsData = students.map(s => ({
    name: s.name,
    rollNo: s.rollNo,
    pretestMarks: parseFloat(marks[s.id]?.pretest || 0),
    posttestMarks: parseFloat(marks[s.id]?.posttest || 0)
  }));

  const encoded = encodeURIComponent(JSON.stringify(studentAnalyticsData));
  router.push(`a/student-analytics?page=true&data=${encoded}`);
};
  const handleDisplayStudents = () => {
    if (
      !selectedSchool ||
      !selectedClass ||
      !selectedDate ||
      !selectedSubject
    ) {
      alert("Please fill all the fields");
      return;
    }

    const studentList = SCHOOLS_DATA[selectedSchool][selectedClass];
    setStudents(studentList);

    // Initialize attendance and marks state
    const initialAttendance = {};
    const initialMarks = {};
    studentList.forEach((student) => {
      initialAttendance[student.id] = false;
      initialMarks[student.id] = { pretest: "", posttest: "" };
    });
    setAttendance(initialAttendance);
    setMarks(initialMarks);
    setShowStudentList(true);
  };

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }));
  };

  const handleMarksChange = (studentId, type, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [type]: value,
      },
    }));
  };

  const handleSubmitAttendance = () => {
    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );
    const totalStudents = students.length;
    const presentCount = presentStudents.length;

    // Optionally, validate marks input here

    alert(
      `Attendance submitted successfully!\n\nTotal Students: ${totalStudents}\nPresent: ${presentCount}\nAbsent: ${
        totalStudents - presentCount
      }\n\nDate: ${selectedDate}\nSubject: ${selectedSubject}`
    );

    // Reset form
    setSelectedSchool("");
    setSelectedClass("");
    setSelectedDate("");
    setSelectedSubject("");
    setStudents([]);
    setAttendance({});
    setMarks({});
    setShowStudentList(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Attendance Sheet
        </h1>

        {!showStudentList ? (
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* School Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School
                </label>
                <select
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value);
                    setSelectedClass("");
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select School</option>
                  {Object.keys(SCHOOLS_DATA).map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  disabled={!selectedSchool}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Select Class</option>
                  {selectedSchool &&
                    Object.keys(SCHOOLS_DATA[selectedSchool]).map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={getTodayDate()}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Subject</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center py-8">
              <button
                onClick={handleDisplayStudents}
                disabled={
                  !selectedSchool ||
                  !selectedClass ||
                  !selectedDate ||
                  !selectedSubject
                }
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 transition-colors text-lg"
              >
                Display Student List
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Information */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Attendance for {selectedClass} - {selectedSubject}
              </h2>
              <p className="text-gray-600">
                School: {selectedSchool} | Date: {selectedDate} | Total
                Students: {students.length}
              </p>
            </div>

            {/* Student List Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Present
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Roll No
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Student Name
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      Pre-test Marks
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      Post-test Marks
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                      Improvement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const pretest = parseFloat(marks[student.id]?.pretest) || 0;
                    const posttest =
                      parseFloat(marks[student.id]?.posttest) || 0;
                    const improvement = posttest - pretest;
                    const improvementPercentage = pretest
                      ? ((improvement / pretest) * 100).toFixed(1)
                      : "0.0";

                    return (
                      <tr
                        key={student.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={attendance[student.id] || false}
                            onChange={(e) =>
                              handleAttendanceChange(
                                student.id,
                                e.target.checked
                              )
                            }
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {student.rollNo}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {student.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={marks[student.id]?.pretest || ""}
                            onChange={(e) =>
                              handleMarksChange(
                                student.id,
                                "pretest",
                                e.target.value
                              )
                            }
                            className="w-20 p-2 border border-gray-300 rounded text-center"
                            placeholder="Pre"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={marks[student.id]?.posttest || ""}
                            onChange={(e) =>
                              handleMarksChange(
                                student.id,
                                "posttest",
                                e.target.value
                              )
                            }
                            className="w-20 p-2 border border-gray-300 rounded text-center"
                            placeholder="Post"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {improvement}{" "}
                          <span className="text-xs text-gray-500">
                            ({improvementPercentage}%)
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Submit Attendance Button */}
            <div className="text-center">
              <div className="text-center space-y-4">
                <button
                  onClick={handleSubmitAttendance}
                  className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-lg"
                >
                  Submit Attendance
                </button>
                <button
                  onClick={handleGetAnalytics}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
                >
                  Get Analytics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
