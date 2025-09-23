import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  CreditCard,
  DollarSign,
  PieChart,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function WealthWiseDashboard() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);

  const transactions = [
    {
      id: 1,
      description: "Starbucks Coffee",
      amount: -4.95,
      category: "Food & Dining",
      date: "Today",
      predicted: false,
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 3200.0,
      category: "Income",
      date: "Yesterday",
      predicted: false,
    },
    {
      id: 3,
      description: "Netflix Subscription",
      amount: -15.99,
      category: "Entertainment",
      date: "2 days ago",
      predicted: true,
    },
    {
      id: 4,
      description: "Grocery Store",
      amount: -87.32,
      category: "Groceries",
      date: "3 days ago",
      predicted: false,
    },
  ];

  const upcomingBills = [
    { name: "Rent Payment", amount: 1200, dueDate: "Dec 1", confidence: 95 },
    { name: "Electric Bill", amount: 85, dueDate: "Dec 5", confidence: 88 },
    { name: "Phone Bill", amount: 65, dueDate: "Dec 10", confidence: 92 },
  ];

  const categories = [
    { name: "Food & Dining", amount: 245, budget: 300, color: "bg-red-500" },
    { name: "Transportation", amount: 120, budget: 200, color: "bg-blue-500" },
    { name: "Entertainment", amount: 89, budget: 150, color: "bg-purple-500" },
    { name: "Groceries", amount: 180, budget: 250, color: "bg-green-500" },
  ];

  return (
    <div className="bg-gray-50 p-6 w-[2252px] h-[2225px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, Sarah!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your financial overview for {currentMonth} {currentYear}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Connect Bank
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                $4,235.89
              </div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Spending
              </CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-muted-foreground">
                -5.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Income
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,200.00</div>
              <p className="text-xs text-muted-foreground">
                Same as last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Savings Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">61.4%</div>
              <p className="text-xs text-muted-foreground">
                +7.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-emerald-600" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>
                    AI-categorized transactions from your connected accounts
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          {transaction.predicted && (
                            <Badge variant="secondary" className="text-xs">
                              <Brain className="w-3 h-3 mr-1" />
                              AI Predicted
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Upcoming Bills
              </CardTitle>
              <CardDescription>
                AI predictions based on your history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBills.map((bill, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{bill.name}</p>
                        <p className="text-sm text-gray-500">
                          Due {bill.dueDate}
                        </p>
                      </div>
                      <p className="font-semibold">${bill.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={bill.confidence}
                        className="flex-1 h-2"
                      />
                      <span className="text-xs text-gray-500">
                        {bill.confidence}% confident
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Categories */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Spending by Category
            </CardTitle>
            <CardDescription>
              Your spending compared to budget this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{category.name}</p>
                    <div
                      className={`w-3 h-3 rounded-full ${category.color}`}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>${category.amount}</span>
                      <span className="text-gray-500">
                        of ${category.budget}
                      </span>
                    </div>
                    <Progress
                      value={(category.amount / category.budget) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-gray-500">
                      {Math.round((category.amount / category.budget) * 100)}%
                      of budget used
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
