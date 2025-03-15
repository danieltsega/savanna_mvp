import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function UserOverviewTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <Progress value={75} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">2 in progress, 1 pending review</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">Next: March 15, 2023</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£250.00</div>
          <p className="text-xs text-muted-foreground mt-2">Due in 7 days</p>
        </CardContent>
      </Card>
    </div>
  )
}

