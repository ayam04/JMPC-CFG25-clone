"use client";
import { useState } from "react";
import Header from "@/components/navbar/header";";
import Head from "next/head";
import WebcamCapture from "../../components/WebcamCapture";

// Hardcoded data for Maharashtrian schools
const SCHOOLS_DATA = {
  "Shivaji Vidyalaya": {
    "Class 6": [
      { id: 1, name: "Aarav Patil", rollNo: "06001", pretestMarks: 45, posttestMarks: 72 },
      { id: 2, name: "Ananya Deshmukh", rollNo: "06002", pretestMarks: 38, posttestMarks: 65 },
      { id: 3, name: "Arjun Kulkarni", rollNo: "06003", pretestMarks: 52, posttestMarks: 78 },
      { id: 4, name: "Avani Shah", rollNo: "06004", pretestMarks: 41, posttestMarks: 69 },
      { id: 5, name: "Devika Joshi", rollNo: "06005", pretestMarks: 47, posttestMarks: 73 },
      { id: 6, name: "Dhanraj Pawar", rollNo: "06006", pretestMarks: 35, posttestMarks: 61 },
      { id: 7, name: "Gauri Bhosale", rollNo: "06007", pretestMarks: 49, posttestMarks: 76 },
      { id: 8, name: "Harsh Jadhav", rollNo: "06008", pretestMarks: 42, posttestMarks: 68 },
      { id: 9, name: "Ishita Wagh", rollNo: "06009", pretestMarks: 44, posttestMarks: 71 },
      { id: 10, name: "Kartik Gaikwad", rollNo: "06010", pretestMarks: 39, posttestMarks: 64 },
      { id: 11, name: "Kavya Shinde", rollNo: "06011", pretestMarks: 46, posttestMarks: 74 },
      { id: 12, name: "Lakshya More", rollNo: "06012", pretestMarks: 40, posttestMarks: 67 },
      { id: 13, name: "Meera Sawant", rollNo: "06013", pretestMarks: 48, posttestMarks: 75 },
      { id: 14, name: "Nikhil Kale", rollNo: "06014", pretestMarks: 36, posttestMarks: 62 },
      { id: 15, name: "Priya Chavan", rollNo: "06015", pretestMarks: 43, posttestMarks: 70 },
      { id: 16, name: "Rahul Mane", rollNo: "06016", pretestMarks: 37, posttestMarks: 63 },
      { id: 17, name: "Riya Tambe", rollNo: "06017", pretestMarks: 50, posttestMarks: 77 },
      { id: 18, name: "Rohan Dalvi", rollNo: "06018", pretestMarks: 41, posttestMarks: 68 },
      { id: 19, name: "Sakshi Patel", rollNo: "06019", pretestMarks: 45, posttestMarks: 72 },
      { id: 20, name: "Siddharth Rane", rollNo: "06020", pretestMarks: 38, posttestMarks: 65 },
      { id: 21, name: "Tanvi Gharat", rollNo: "06021", pretestMarks: 47, posttestMarks: 74 },
      { id: 22, name: "Tejas Sonar", rollNo: "06022", pretestMarks: 42, posttestMarks: 69 },
      { id: 23, name: "Varun Navale", rollNo: "06023", pretestMarks: 44, posttestMarks: 71 },
      { id: 24, name: "Vidya Kadam", rollNo: "06024", pretestMarks: 46, posttestMarks: 73 },
      { id: 25, name: "Yash Thorat", rollNo: "06025", pretestMarks: 39, posttestMarks: 66 },
      { id: 26, name: "Zara Nair", rollNo: "06026", pretestMarks: 48, posttestMarks: 75 },
      { id: 27, name: "Aarya Jain", rollNo: "06027", pretestMarks: 40, posttestMarks: 67 },
      { id: 28, name: "Chinmay Borse", rollNo: "06028", pretestMarks: 43, posttestMarks: 70 },
      { id: 29, name: "Deepika Raut", rollNo: "06029", pretestMarks: 45, posttestMarks: 72 },
      { id: 30, name: "Esha Bhoir", rollNo: "06030", pretestMarks: 41, posttestMarks: 68 },
      { id: 31, name: "Krish Bapat", rollNo: "06031", pretestMarks: 37, posttestMarks: 64 },
      { id: 32, name: "Manasi Deo", rollNo: "06032", pretestMarks: 49, posttestMarks: 76 },
      { id: 33, name: "Omkar Salvi", rollNo: "06033", pretestMarks: 42, posttestMarks: 69 },
      { id: 34, name: "Pallavi Bhagat", rollNo: "06034", pretestMarks: 44, posttestMarks: 71 },
      { id: 35, name: "Rishabh Bhat", rollNo: "06035", pretestMarks: 46, posttestMarks: 73 },
      { id: 36, name: "Shreya Jog", rollNo: "06036", pretestMarks: 38, posttestMarks: 65 },
      { id: 37, name: "Tushar Mhatre", rollNo: "06037", pretestMarks: 47, posttestMarks: 74 },
      { id: 38, name: "Urvi Kopkar", rollNo: "06038", pretestMarks: 43, posttestMarks: 70 },
      { id: 39, name: "Vivek Khaire", rollNo: "06039", pretestMarks: 45, posttestMarks: 72 },
      { id: 40, name: "Yashika Dixit", rollNo: "06040", pretestMarks: 40, posttestMarks: 67 }
    ],
    "Class 7": [
      { id: 1, name: "Aditya Marathe", rollNo: "07001", pretestMarks: 52, posttestMarks: 78 },
      { id: 2, name: "Anjali Iyer", rollNo: "07002", pretestMarks: 48, posttestMarks: 74 },
      { id: 3, name: "Aryan Gupta", rollNo: "07003", pretestMarks: 55, posttestMarks: 81 },
      { id: 4, name: "Bhavya Thakur", rollNo: "07004", pretestMarks: 46, posttestMarks: 72 },
      { id: 5, name: "Chaitanya Deshpande", rollNo: "07005", pretestMarks: 51, posttestMarks: 77 },
      { id: 6, name: "Divya Mahajan", rollNo: "07006", pretestMarks: 44, posttestMarks: 70 },
      { id: 7, name: "Ganesh Aggarwal", rollNo: "07007", pretestMarks: 53, posttestMarks: 79 },
      { id: 8, name: "Hrishikesh Pandit", rollNo: "07008", pretestMarks: 47, posttestMarks: 73 },
      { id: 9, name: "Isha Fadnavis", rollNo: "07009", pretestMarks: 49, posttestMarks: 75 },
      { id: 10, name: "Jayesh Kamat", rollNo: "07010", pretestMarks: 45, posttestMarks: 71 },
      { id: 11, name: "Kaveri Sane", rollNo: "07011", pretestMarks: 50, posttestMarks: 76 },
      { id: 12, name: "Laxman Gokhale", rollNo: "07012", pretestMarks: 43, posttestMarks: 69 },
      { id: 13, name: "Madhura Kulkarni", rollNo: "07013", pretestMarks: 52, posttestMarks: 78 },
      { id: 14, name: "Niraj Shirke", rollNo: "07014", pretestMarks: 41, posttestMarks: 67 },
      { id: 15, name: "Pooja Tendulkar", rollNo: "07015", pretestMarks: 48, posttestMarks: 74 },
      { id: 16, name: "Rajesh Moghe", rollNo: "07016", pretestMarks: 44, posttestMarks: 70 },
      { id: 17, name: "Rutuja Paranjpe", rollNo: "07017", pretestMarks: 54, posttestMarks: 80 },
      { id: 18, name: "Sanket Bhave", rollNo: "07018", pretestMarks: 46, posttestMarks: 72 },
      { id: 19, name: "Smita Kelkar", rollNo: "07019", pretestMarks: 49, posttestMarks: 75 },
      { id: 20, name: "Tanmay Gadgil", rollNo: "07020", pretestMarks: 42, posttestMarks: 68 },
      { id: 21, name: "Ujjwal Khandekar", rollNo: "07021", pretestMarks: 51, posttestMarks: 77 },
      { id: 22, name: "Varsha Joglekar", rollNo: "07022", pretestMarks: 47, posttestMarks: 73 },
      { id: 23, name: "Waman Chitale", rollNo: "07023", pretestMarks: 48, posttestMarks: 74 },
      { id: 24, name: "Yogesh Phadke", rollNo: "07024", pretestMarks: 50, posttestMarks: 76 },
      { id: 25, name: "Zoya Shaikh", rollNo: "07025", pretestMarks: 45, posttestMarks: 71 },
      { id: 26, name: "Akash Barve", rollNo: "07026", pretestMarks: 53, posttestMarks: 79 },
      { id: 27, name: "Chetna Limaye", rollNo: "07027", pretestMarks: 46, posttestMarks: 72 },
      { id: 28, name: "Dharma Ranade", rollNo: "07028", pretestMarks: 49, posttestMarks: 75 },
      { id: 29, name: "Ekta Devasthali", rollNo: "07029", pretestMarks: 47, posttestMarks: 73 },
      { id: 30, name: "Faizal Khan", rollNo: "07030", pretestMarks: 44, posttestMarks: 70 },
      { id: 31, name: "Girish Apte", rollNo: "07031", pretestMarks: 52, posttestMarks: 78 },
      { id: 32, name: "Harshada Sathe", rollNo: "07032", pretestMarks: 48, posttestMarks: 74 },
      { id: 33, name: "Indraneel Joshi", rollNo: "07033", pretestMarks: 45, posttestMarks: 71 },
      { id: 34, name: "Janhavi Dabholkar", rollNo: "07034", pretestMarks: 50, posttestMarks: 76 },
      { id: 35, name: "Kiran Tipnis", rollNo: "07035", pretestMarks: 43, posttestMarks: 69 },
      { id: 36, name: "Leena Naik", rollNo: "07036", pretestMarks: 51, posttestMarks: 77 },
      { id: 37, name: "Mukul Dixit", rollNo: "07037", pretestMarks: 46, posttestMarks: 72 },
      { id: 38, name: "Nandini Oak", rollNo: "07038", pretestMarks: 49, posttestMarks: 75 },
      { id: 39, name: "Omkar Vaidya", rollNo: "07039", pretestMarks: 47, posttestMarks: 73 },
      { id: 40, name: "Pranali Dhage", rollNo: "07040", pretestMarks: 44, posttestMarks: 70 }
    ],
    "Class 8": [
      { id: 1, name: "Abhishek Kulkarni", rollNo: "08001", pretestMarks: 58, posttestMarks: 84 },
      { id: 2, name: "Aditi Joshi", rollNo: "08002", pretestMarks: 54, posttestMarks: 80 },
      { id: 3, name: "Akshay Patil", rollNo: "08003", pretestMarks: 61, posttestMarks: 87 },
      { id: 4, name: "Anushka Desai", rollNo: "08004", pretestMarks: 52, posttestMarks: 78 },
      { id: 5, name: "Chirag Shah", rollNo: "08005", pretestMarks: 57, posttestMarks: 83 },
      { id: 6, name: "Diya Agarwal", rollNo: "08006", pretestMarks: 50, posttestMarks: 76 },
      { id: 7, name: "Gaurav Sharma", rollNo: "08007", pretestMarks: 59, posttestMarks: 85 },
      { id: 8, name: "Himani Patel", rollNo: "08008", pretestMarks: 53, posttestMarks: 79 },
      { id: 9, name: "Ishan Mehta", rollNo: "08009", pretestMarks: 55, posttestMarks: 81 },
      { id: 10, name: "Janvi Thakkar", rollNo: "08010", pretestMarks: 51, posttestMarks: 77 },
      { id: 11, name: "Kaushal Rao", rollNo: "08011", pretestMarks: 56, posttestMarks: 82 },
      { id: 12, name: "Lavanya Singh", rollNo: "08012", pretestMarks: 49, posttestMarks: 75 },
      { id: 13, name: "Mihir Gupta", rollNo: "08013", pretestMarks: 58, posttestMarks: 84 },
      { id: 14, name: "Nisha Verma", rollNo: "08014", pretestMarks: 47, posttestMarks: 73 },
      { id: 15, name: "Pranav Jain", rollNo: "08015", pretestMarks: 54, posttestMarks: 80 },
      { id: 16, name: "Radhika Soni", rollNo: "08016", pretestMarks: 50, posttestMarks: 76 },
      { id: 17, name: "Sagar Nair", rollNo: "08017", pretestMarks: 60, posttestMarks: 86 },
      { id: 18, name: "Tanushree Roy", rollNo: "08018", pretestMarks: 52, posttestMarks: 78 },
      { id: 19, name: "Utkarsh Modi", rollNo: "08019", pretestMarks: 55, posttestMarks: 81 },
      { id: 20, name: "Vedika Kapoor", rollNo: "08020", pretestMarks: 48, posttestMarks: 74 },
      { id: 21, name: "Yuvraj Singh", rollNo: "08021", pretestMarks: 57, posttestMarks: 83 },
      { id: 22, name: "Zain Ahmad", rollNo: "08022", pretestMarks: 53, posttestMarks: 79 },
      { id: 23, name: "Aarohi Bansal", rollNo: "08023", pretestMarks: 56, posttestMarks: 82 },
      { id: 24, name: "Daksh Mittal", rollNo: "08024", pretestMarks: 51, posttestMarks: 77 },
      { id: 25, name: "Eesha Goyal", rollNo: "08025", pretestMarks: 54, posttestMarks: 80 },
      { id: 26, name: "Farhan Sheikh", rollNo: "08026", pretestMarks: 49, posttestMarks: 75 },
      { id: 27, name: "Garima Bhatt", rollNo: "08027", pretestMarks: 58, posttestMarks: 84 },
      { id: 28, name: "Hardik Pandya", rollNo: "08028", pretestMarks: 52, posttestMarks: 78 },
      { id: 29, name: "Ishaan Kumar", rollNo: "08029", pretestMarks: 55, posttestMarks: 81 },
      { id: 30, name: "Jiya Malhotra", rollNo: "08030", pretestMarks: 50, posttestMarks: 76 },
      { id: 31, name: "Kshitij Saxena", rollNo: "08031", pretestMarks: 57, posttestMarks: 83 },
      { id: 32, name: "Manya Arora", rollNo: "08032", pretestMarks: 53, posttestMarks: 79 },
      { id: 33, name: "Naman Chopra", rollNo: "08033", pretestMarks: 56, posttestMarks: 82 },
      { id: 34, name: "Payal Khanna", rollNo: "08034", pretestMarks: 48, posttestMarks: 74 },
      { id: 35, name: "Rachit Bhatnagar", rollNo: "08035", pretestMarks: 59, posttestMarks: 85 },
      { id: 36, name: "Simran Kaur", rollNo: "08036", pretestMarks: 51, posttestMarks: 77 },
      { id: 37, name: "Tarun Aggarwal", rollNo: "08037", pretestMarks: 54, posttestMarks: 80 },
      { id: 38, name: "Urvashi Jindal", rollNo: "08038", pretestMarks: 52, posttestMarks: 78 },
      { id: 39, name: "Vikram Tiwari", rollNo: "08039", pretestMarks: 55, posttestMarks: 81 },
      { id: 40, name: "Yamini Bajaj", rollNo: "08040", pretestMarks: 47, posttestMarks: 73 }
    ]
  },
  "Rashtrasant Tukadoji Maharaj Vidyalaya": {
    "Class 6": [
      { id: 1, name: "Aarush Bhagwat", rollNo: "06001", pretestMarks: 43, posttestMarks: 69 },
      // ... Similar structure with 40 students for each class
    ],
    "Class 7": [
      { id: 1, name: "Advik Lokhande", rollNo: "07001", pretestMarks: 49, posttestMarks: 75 },
      // ... 40 students
    ],
    "Class 8": [
      { id: 1, name: "Arush Khot", rollNo: "08001", pretestMarks: 55, posttestMarks: 81 },
      // ... 40 students
    ]
  },
  "Chhatrapati Shivaji High School": {
    "Class 6": [
      { id: 1, name: "Atharv Datar", rollNo: "06001", pretestMarks: 41, posttestMarks: 67 },
      // ... 40 students
    ],
    "Class 7": [
      { id: 1, name: "Avni Khadilkar", rollNo: "07001", pretestMarks: 47, posttestMarks: 73 },
      // ... 40 students
    ],
    "Class 8": [
      { id: 1, name: "Ayush Ghodke", rollNo: "08001", pretestMarks: 53, posttestMarks: 79 },
      // ... 40 students
    ]
  }
};

const SUBJECTS = [
  "Mathematics",
  "Science", 
  "English",
  "Marathi",
  "Hindi",
  "Social Studies",
  "Drawing",
  "Physical Education"
];

export default function AttendancePage() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [showStudentList, setShowStudentList] = useState(false);

  const handleDisplayStudents = () => {
    if (!selectedSchool || !selectedClass || !selectedDate || !selectedSubject) {
      alert("Please fill all the fields");
      return;
    }

    const studentList = SCHOOLS_DATA[selectedSchool][selectedClass];
    setStudents(studentList);
    
    // Initialize attendance state
    const initialAttendance = {};
    studentList.forEach(student => {
      initialAttendance[student.id] = false;
    });
    setAttendance(initialAttendance);
    setShowStudentList(true);
  };

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleSubmitAttendance = () => {
    const presentStudents = students.filter(student => attendance[student.id]);
    const totalStudents = students.length;
    const presentCount = presentStudents.length;
    
    alert(`Attendance submitted successfully!\n\nTotal Students: ${totalStudents}\nPresent: ${presentCount}\nAbsent: ${totalStudents - presentCount}\n\nDate: ${selectedDate}\nSubject: ${selectedSubject}`);
    
    // Reset form
    setSelectedSchool('');
    setSelectedClass('');
    setSelectedDate('');
    setSelectedSubject('');
    setStudents([]);
    setAttendance({});
    setShowStudentList(false);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <>
    <Header />
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
                    setSelectedClass('');
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select School</option>
                  {Object.keys(SCHOOLS_DATA).map(school => (
                    <option key={school} value={school}>{school}</option>
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
                  {selectedSchool && Object.keys(SCHOOLS_DATA[selectedSchool]).map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
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
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center py-8">
              <button
                onClick={handleDisplayStudents}
                disabled={!selectedSchool || !selectedClass || !selectedDate || !selectedSubject}
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
                School: {selectedSchool} | Date: {selectedDate} | Total Students: {students.length}
              </p>
            </div>

            {/* Student List Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Present</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Roll No</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Student Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Pre-test Marks</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Post-test Marks</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const improvement = student.posttestMarks - student.pretestMarks;
                    const improvementPercentage = ((improvement / student.pretestMarks) * 100).toFixed(1);
                    
                    return (
                    
<tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
  <td className="border border-gray-300 px-4 py-3 text-center">
    <input
      type="checkbox"
      checked={attendance[student.id] || false}
      onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
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
    {student.pretestMarks}
  </td>
  <td className="border border-gray-300 px-4 py-3 text-center">
    {student.posttestMarks}
  </td>
  <td className="border border-gray-300 px-4 py-3 text-center">
    {student.posttestMarks - student.pretestMarks}{" "}
    <span className="text-xs text-gray-500">
      ({((student.posttestMarks - student.pretestMarks) / student.pretestMarks * 100).toFixed(1)}%)
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
              <button
                onClick={handleSubmitAttendance}
                className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-lg"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
  );
}
// ...existing code...