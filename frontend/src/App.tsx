import React, { useState } from 'react'
import { motion } from 'framer-motion'
import HealthForm from './components/HealthForm'
import HealthInsights from './components/HealthInsights'

interface HealthData {
  age: number;
  height: number;
  weight: number;
  gender: string;
  activityLevel: string;
  symptoms: string;
  sleepHours: number;
  waterIntake: number;
}

interface AnalysisData {
  bmi: {
    value: number;
    category: string;
    recommendation: string;
  };
  bmr: {
    value: number;
    explanation: string;
  };
  calorieNeeds: {
    maintenance: number;
    weightLoss: number;
    weightGain: number;
    recommendation: string;
  };
  sleepAnalysis: {
    current: number;
    recommended: string;
    status: string;
    tips: string[];
  };
  hydrationAnalysis: {
    current: number;
    recommended: number;
    status: string;
    tips: string[];
  };
  generalHealth: {
    status: string;
    recommendations: string[];
  };
}

function App() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: HealthData) => {
    setLoading(true)
    setError(null)
    try {
      console.log('Sending data:', data) // Debug log
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze health data')
      }

      const analysisData = await response.json()
      console.log('Received analysis:', analysisData) // Debug log
      setHealthData(data)
      setAnalysis(analysisData)
    } catch (err) {
      console.error('Error details:', err) // Debug log
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-light overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-10" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark/80 via-transparent to-neon-purple/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 py-12"
      >
        <h1 className="text-6xl font-bold text-center mb-8 animate-glow text-cyber-primary">
          CyberHealth
          <span className="text-neon-pink">Scan</span>
        </h1>
        
        <p className="text-xl text-center mb-12 text-cyber-light/80">
          Experience the future of health diagnostics
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary"></div>
              <p className="mt-4 text-cyber-light">Analyzing health data...</p>
            </motion.div>
          ) : !healthData || !analysis ? (
            <HealthForm onSubmit={handleSubmit} />
          ) : (
            <HealthInsights data={healthData} analysis={analysis} />
          )}
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-neon-pink to-cyber-secondary" />
      <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-cyber-primary via-neon-blue to-cyber-secondary" />
    </div>
  )
}

export default App 