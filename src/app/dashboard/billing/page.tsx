'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../../supabase/client'
import DashboardNavbar from '@/components/dashboard-navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { CreditCard, Calendar, DollarSign, AlertCircle, CheckCircle, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Billing() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<any>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/sign-in')
        return
      }

      setUser(user)
      
      // TODO: Fetch actual subscription data from your database
      // This is mock data for now
      setSubscription({
        plan: 'Pro Plan',
        status: 'active',
        amount: 2000, // $20.00 in cents
        interval: 'month',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancel_at_period_end: false
      })
      
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const handleCancelSubscription = async () => {
    try {
      // TODO: Implement actual subscription cancellation
      toast({
        title: "Subscription cancelled",
        description: "Your subscription will end at the end of the current billing period.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel subscription",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePayment = async () => {
    try {
      // TODO: Implement Stripe customer portal redirect
      toast({
        title: "Redirecting",
        description: "Redirecting to payment management...",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to redirect to payment management",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-2">
            Manage your subscription and billing information
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Your active subscription details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{subscription?.plan || 'Free Plan'}</h3>
                    <Badge variant={subscription?.status === 'active' ? 'default' : 'secondary'}>
                      {subscription?.status === 'active' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {subscription?.status || 'Inactive'}
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${subscription ? (subscription.amount / 100).toFixed(2) : '0.00'}/{subscription?.interval || 'month'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Renews {subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  {subscription?.cancel_at_period_end && (
                    <div className="flex items-center gap-1 text-orange-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Your subscription will end on {new Date(subscription.current_period_end).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => router.push('/pricing')}>
                    Change Plan
                  </Button>
                  {subscription?.status === 'active' && !subscription?.cancel_at_period_end && (
                    <Button variant="destructive" onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleUpdatePayment}>
                  <Settings className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Your recent billing transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock billing history */}
                {[
                  { date: '2024-01-01', amount: 20.00, status: 'paid', invoice: 'INV-001' },
                  { date: '2023-12-01', amount: 20.00, status: 'paid', invoice: 'INV-002' },
                  { date: '2023-11-01', amount: 20.00, status: 'paid', invoice: 'INV-003' },
                ].map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Pro Plan Subscription</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.invoice}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <Button variant="outline" className="w-full">
                View All Invoices
              </Button>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
              <CardDescription>
                The address associated with your payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-medium">{user?.user_metadata?.full_name || 'John Doe'}</p>
                <p>123 Main Street</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </div>
              <Button variant="outline" className="mt-4">
                Update Address
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}