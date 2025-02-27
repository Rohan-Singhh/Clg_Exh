import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface HealthFormProps {
  onSubmit: (data: {
    age: number;
    height: number;
    weight: number;
    gender: string;
    activityLevel: string;
    symptoms: string;
    sleepHours: number;
    waterIntake: number;
  }) => void;
}

const HealthForm = ({ onSubmit }: HealthFormProps) => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    activityLevel: 'moderate',
    symptoms: '',
    sleepHours: '',
    waterIntake: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      gender: formData.gender,
      activityLevel: formData.activityLevel,
      symptoms: formData.symptoms,
      sleepHours: Number(formData.sleepHours),
      waterIntake: Number(formData.waterIntake)
    })
  }

  const inputClasses = "w-full bg-cyber-dark/50 border-2 border-cyber-primary rounded-lg p-3 text-cyber-light placeholder-cyber-light/50 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-neon"
  const selectClasses = `${inputClasses} appearance-none bg-cyber-dark/50`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-8 border border-cyber-primary/30 shadow-neon"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-cyber-primary mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className={inputClasses}
              placeholder="Enter your age"
              required
              min="1"
              max="120"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-cyber-primary mb-2">Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className={inputClasses}
              placeholder="Enter your height"
              required
              min="50"
              max="250"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-cyber-primary mb-2">Weight (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className={inputClasses}
              placeholder="Enter your weight"
              required
              min="20"
              max="300"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-cyber-primary mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className={selectClasses}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-cyber-primary mb-2">Activity Level</label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              className={selectClasses}
              required
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 times/week)</option>
              <option value="moderate">Moderate (exercise 3-5 times/week)</option>
              <option value="active">Active (exercise 6-7 times/week)</option>
              <option value="veryActive">Very Active (hard exercise daily)</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-cyber-primary mb-2">Sleep Hours</label>
            <input
              type="number"
              value={formData.sleepHours}
              onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
              className={inputClasses}
              placeholder="Hours of sleep per night"
              required
              min="0"
              max="24"
              step="0.5"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-cyber-primary mb-2">Water Intake (L)</label>
            <input
              type="number"
              value={formData.waterIntake}
              onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
              className={inputClasses}
              placeholder="Daily water intake in liters"
              required
              min="0"
              max="10"
              step="0.1"
            />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-2"
          >
            <label className="block text-cyber-primary mb-2">Symptoms</label>
            <textarea
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className={`${inputClasses} h-24 resize-none`}
              placeholder="Describe any symptoms or health concerns"
              required
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-cyber-primary to-neon-blue text-cyber-dark font-bold py-3 px-6 rounded-lg hover:shadow-neon-strong transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze Health Data
        </motion.button>
      </form>
    </motion.div>
  )
}

export default HealthForm 