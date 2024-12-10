'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function CreateBotPage() {
  const [botName, setBotName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [allowFileUpload, setAllowFileUpload] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the bot creation logic
    console.log('Bot created:', { botName, prompt, allowFileUpload })
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/existing-agents')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Your AI Chatbot</CardTitle>
          <CardDescription className="text-gray-400">Customize your bot's behavior and capabilities</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bot-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bot Name</label>
              <Input
                id="bot-name"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Enter your bot's name"
                required
                className="bg-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="prompt" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Prompt</label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter the initial prompt for your bot"
                required
                className="min-h-[100px] bg-gray-700 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="allow-file-upload"
                checked={allowFileUpload}
                onCheckedChange={setAllowFileUpload}
              />
              <label htmlFor="allow-file-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Allow File Upload
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create Bot</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

