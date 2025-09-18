"use client";

import { useHandleFindDashboardOverviewQuery } from "@/Redux/features/dashboard/dashboardApi";
import {
  Award,
  Calendar,
  Bell,
  Image,
  Video,
  Star,
  Users2,
  Folder,
  Users,
  Layers,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import DashboardSkeleton from "./DashboardSkeleton";
import DashboardError from "./DashboardError";

export default function Dashboard() {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useHandleFindDashboardOverviewQuery({});
  const overview = data?.payload;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Full overview of your website’s content, performance, and trends
        </p>
      </div>

      {/* Loading & Error */}
      {isLoading || isFetching ? (
        <DashboardSkeleton />
      ) : isError ? (
        <DashboardError
          message={(error as any)?.data?.message}
          onRetry={() => refetch()} // if your query has refetch
        />
      ) : (
        <>
          {/* === Quick Counts === */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Achievements"
              value={overview?.counts?.achievements || 0}
              icon={<Award className="h-6 w-6 text-yellow-500" />}
            />
            <StatCard
              title="Events"
              value={overview?.counts?.events || 0}
              icon={<Calendar className="h-6 w-6 text-blue-500" />}
            />
            <StatCard
              title="Notices"
              value={overview?.counts?.notices || 0}
              icon={<Bell className="h-6 w-6 text-red-500" />}
            />
            <StatCard
              title="Galleries"
              value={overview?.counts?.galleries || 0}
              icon={<Image className="h-6 w-6 text-purple-500" />}
            />
            <StatCard
              title="Videos"
              value={overview?.counts?.videos || 0}
              icon={<Video className="h-6 w-6 text-pink-500" />}
            />
            <StatCard
              title="Sponsors"
              value={overview?.counts?.sponsors || 0}
              icon={<Star className="h-6 w-6 text-green-500" />}
            />
            <StatCard
              title="Players"
              value={overview?.counts?.players || 0}
              icon={<Users2 className="h-6 w-6 text-indigo-500" />}
            />
            <StatCard
              title="Performers"
              value={overview?.counts?.performers || 0}
              icon={<Users className="h-6 w-6 text-teal-500" />}
            />
            <StatCard
              title="Committees"
              value={overview?.counts?.committees || 0}
              icon={<Folder className="h-6 w-6 text-orange-500" />}
            />
            <StatCard
              title="All Committees"
              value={overview?.counts?.allCommittees || 0}
              icon={<Layers className="h-6 w-6 text-cyan-500" />}
            />
            <StatCard
              title="Event Categories"
              value={overview?.counts?.eventCategories || 0}
              icon={<Calendar className="h-6 w-6 text-fuchsia-500" />}
            />
            <StatCard
              title="Contacts"
              value={overview?.counts?.contacts || 0}
              icon={<MessageSquare className="h-6 w-6 text-slate-500" />}
            />
          </div>

          {/* === Website Stats === */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Website Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
              <p>
                <span className="font-medium">Members:</span>{" "}
                {overview?.stats?.member}
              </p>
              <p>
                <span className="font-medium">Events:</span>{" "}
                {overview?.stats?.event}
              </p>
              <p>
                <span className="font-medium">Achievements:</span>{" "}
                {overview?.stats?.achievement}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {overview?.stats?.status}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {new Date(overview?.stats?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Updated At:</span>{" "}
                {new Date(overview?.stats?.updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* === Recent Activities === */}
          <div className="grid lg:grid-cols-3 gap-6">
            <RecentCard
              title="Latest Events"
              items={overview?.recent?.latestEvents}
              renderItem={(e: any) => (
                <>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.eventStartDate).toLocaleDateString()} -{" "}
                    {new Date(e.eventEndDate).toLocaleDateString()}
                  </p>
                </>
              )}
            />
            <RecentCard
              title="Latest Notices"
              items={overview?.recent?.latestNotices}
              renderItem={(n: any) => (
                <>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Status: {n.status}
                  </p>
                </>
              )}
            />
            <RecentCard
              title="Latest Contacts"
              items={overview?.recent?.latestContacts}
              renderItem={(c: any) => (
                <>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </>
              )}
            />
          </div>

          {/* === Monthly Trends Graph === */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Monthly Trends (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overview?.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="events" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="notices" stroke="#ef4444" />
                  <Line type="monotone" dataKey="contacts" stroke="#22c55e" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* === Status Breakdown === */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      type: "Events",
                      pending: overview?.statusSummary?.events?.pending,
                      published: overview?.statusSummary?.events?.published,
                    },
                    {
                      type: "Notices",
                      pending: overview?.statusSummary?.notices?.pending,
                      published: overview?.statusSummary?.notices?.published,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pending" fill="#f59e0b" />
                  <Bar dataKey="published" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* === Insights === */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Admin Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Busiest Month:</span>{" "}
                {overview?.insights?.busiestMonth?.month}
              </p>
              <p>
                <span className="font-medium">Total Content Items:</span>{" "}
                {overview?.insights?.totalContentItems}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

/* Reusable StatCard */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

/* Reusable RecentCard */
function RecentCard({
  title,
  items,
  renderItem,
}: {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items?.length ? (
          <ul className="space-y-3">
            {items.map((item: any) => (
              <li key={item._id} className="p-3 rounded-lg bg-muted text-sm">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No recent {title.toLowerCase()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
