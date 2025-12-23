"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardList,
  Eye,
  CalendarCheck,
  Calendar,
  FileText,
  Megaphone,
  BookOpen,
  Newspaper,
  MessageSquare,
} from "lucide-react"

import RequireRole from "./RequireRole"
import MarksEntryPage from "./MarksEntry"
import ViewMarksPage from "./MarksView"
import MarkAttendancePage from "./AtendMark"
import ViewAttendancePages from "@/app/attendance/view/page"
import CertificatesPage from "./Certificates"
import HomeworkPage from "./Homework"
import NewsFeedPage from "./NewsFeed"
import EventsPage from "./Events"
import CommunicationPage from "@/app/communication/page"
import TeacherLeavesPage from "./teacherleave"

const actions = [
  { id: "marks-entry", label: "Marks Entry", icon: ClipboardList },
  { id: "marks-view", label: "Marks View", icon: Eye },
  { id: "attendance-mark", label: "Attendance Mark", icon: CalendarCheck },
  { id: "attendance-view", label: "Attendance View", icon: Calendar },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "events", label: "Events", icon: Megaphone },
  { id: "homework", label: "Homeworks", icon: BookOpen },
  { id: "newsfeed", label: "News Feed", icon: Newspaper },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "leaves", label: "Leaves Management", icon: Calendar },
]

export default function TeachersPage() {
  const [active, setActive] = useState(actions[0])

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-green-200 shadow-lg">
        <div className="p-6 border-b border-green-200">
          <h1 className="text-2xl font-bold text-green-700">
            🎓 Teacher Panel
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          {actions.map((item) => {
            const Icon = item.icon
            const isActive = active.id === item.id

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(item)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition
                  ${
                    isActive
                      ? "bg-green-600 text-white shadow-md"
                      : "text-green-700 hover:bg-green-100"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden h-full"
          >
            {/* HEADER (padding only here) */}
            <div className="p-8 border-b border-green-100">
              <h2 className="text-3xl font-bold text-green-700">
                {active.label}
              </h2>
              <p className="text-gray-600">
                Manage <span className="font-semibold">{active.label}</span> here.
              </p>
            </div>

            {/* CONTENT AREA (NO padding, NO border) */}
            <div className="h-full">
              {renderContent(active.id)}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

/* ---------------- CONTENT RENDERER ---------------- */

function renderContent(section: string) {
  switch (section) {
    case "marks-entry":
      return <MarksEntry />

    case "marks-view":
      return <MarksView />

    case "attendance-mark":
      return <AttendanceMark />

    case "attendance-view":
      return <AttendanceView />

    case "certificates":
      return <Certificate />

    case "homework":
      return <Homework />

    case "newsfeed":
      return <Newsfeed />

    case "events":
      return <Events />

    case "communication":
      return <Communication />

    case "leaves":
      return <Leaves />

    default:
      return <ComingSoon />
  }
}

/* ---------------- PAGE WRAPPERS ---------------- */

function MarksEntry() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <MarksEntryPage />
    </RequireRole>
  )
}

function MarksView() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <ViewMarksPage />
    </RequireRole>
  )
}

function AttendanceMark() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <MarkAttendancePage />
    </RequireRole>
  )
}

function AttendanceView() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <ViewAttendancePages />
    </RequireRole>
  )
}

function Certificate() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <CertificatesPage />
    </RequireRole>
  )
}

function Homework() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <HomeworkPage />
    </RequireRole>
  )
}

function Newsfeed() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <NewsFeedPage />
    </RequireRole>
  )
}

function Events() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <EventsPage />
    </RequireRole>
  )
}

function Communication() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <CommunicationPage />
    </RequireRole>
  )
}

function Leaves() {
  return (
    <RequireRole allowedRoles={["TEACHER"]}>
      <TeacherLeavesPage />
    </RequireRole>
  )
}

function ComingSoon() {
  return (
    <div className="text-center py-20">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        🚧 Coming Soon!
      </h3>
      <p className="text-gray-500">
        This feature is under development. Stay tuned!
      </p>
    </div>
  )
}