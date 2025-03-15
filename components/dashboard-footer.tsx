export function DashboardFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Savanna Accountancy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

