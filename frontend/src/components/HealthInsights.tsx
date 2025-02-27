import React from 'react'
import { motion } from 'framer-motion'

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
    tips: string[]; // Ensure this is always an array
  };
  hydrationAnalysis: {
    current: number;
    recommended: number;
    status: string;
    tips: string[]; // Ensure this is always an array
  };
  generalHealth: {
    status: string;
    recommendations: string[]; // Ensure this is always an array
  };
}

interface HealthInsightsProps {
  data: HealthData;
  analysis: AnalysisData;
}

const HealthInsights = ({ data, analysis }: HealthInsightsProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Underweight: 'text-neon-blue',
      Normal: 'text-neon-green',
      Overweight: 'text-neon-yellow',
      Obese: 'text-neon-pink',
      Optimal: 'text-neon-green',
      Insufficient: 'text-neon-pink',
      'Below Target': 'text-neon-yellow',
      'Above Target': 'text-neon-yellow',
      Excessive: 'text-neon-pink',
    };
    return colors[status as keyof typeof colors] || 'text-cyber-light';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-cyber-primary animate-glow mb-8">
        Health Analysis Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-6 border border-cyber-primary/30 shadow-neon"
        >
          <h3 className="text-xl font-semibold text-cyber-primary mb-4">Basic Information</h3>
          <div className="space-y-2">
            <p className="text-cyber-light">Age: <span className="text-neon-blue">{data.age} years</span></p>
            <p className="text-cyber-light">Height: <span className="text-neon-pink">{data.height} cm</span></p>
            <p className="text-cyber-light">Weight: <span className="text-neon-purple">{data.weight} kg</span></p>
            <p className="text-cyber-light">Gender: <span className="text-neon-blue">{data.gender}</span></p>
            <p className="text-cyber-light">Activity Level: <span className="text-neon-green">{data.activityLevel}</span></p>
          </div>
        </motion.div>

        {/* BMI Analysis */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-6 border border-cyber-primary/30 shadow-neon"
        >
          <h3 className="text-xl font-semibold text-cyber-primary mb-4">BMI Analysis</h3>
          <div className="space-y-2">
            <p className="text-cyber-light">BMI Score: <span className="text-neon-blue">{analysis.bmi.value}</span></p>
            <p className="text-cyber-light">
              Category: <span className={getStatusColor(analysis.bmi.category)}>{analysis.bmi.category}</span>
            </p>
            <p className="text-cyber-light/80 text-sm mt-2">{analysis.bmi.recommendation}</p>
          </div>
        </motion.div>

        {/* BMR and Calories */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-6 border border-cyber-primary/30 shadow-neon"
        >
          <h3 className="text-xl font-semibold text-cyber-primary mb-4">Metabolic Analysis</h3>
          <div className="space-y-2">
            <p className="text-cyber-light">BMR: <span className="text-neon-blue">{analysis.bmr.value} calories/day</span></p>
            <p className="text-cyber-light/80 text-sm">{analysis.bmr.explanation}</p>
            <div className="mt-4">
              <p className="text-cyber-light">Daily Calorie Needs:</p>
              <p className="text-cyber-light">Maintenance: <span className="text-neon-green">{analysis.calorieNeeds.maintenance}</span></p>
              <p className="text-cyber-light">Weight Loss: <span className="text-neon-yellow">{analysis.calorieNeeds.weightLoss}</span></p>
              <p className="text-cyber-light">Weight Gain: <span className="text-neon-purple">{analysis.calorieNeeds.weightGain}</span></p>
            </div>
            <p className="text-cyber-light/80 text-sm mt-2">{analysis.calorieNeeds.recommendation}</p>
          </div>
        </motion.div>

        {/* Sleep Analysis */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-6 border border-cyber-primary/30 shadow-neon"
        >
          <h3 className="text-xl font-semibold text-cyber-primary mb-4">Sleep Analysis</h3>
          <div className="space-y-2">
            <p className="text-cyber-light">Current Sleep: <span className="text-neon-blue">{analysis.sleepAnalysis.current} hours</span></p>
            <p className="text-cyber-light">Recommended: <span className="text-neon-green">{analysis.sleepAnalysis.recommended}</span></p>
            <p className="text-cyber-light">
              Status: <span className={getStatusColor(analysis.sleepAnalysis.status)}>{analysis.sleepAnalysis.status}</span>
            </p>
            <div className="mt-4">
              <p className="text-cyber-light">Sleep Tips:</p>
              <ul className="list-disc list-inside text-cyber-light/80 text-sm">
                {(analysis.sleepAnalysis.tips || []).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Hydration Analysis */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={4}
          className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-6 border border-cyber-primary/30 shadow-neon md:col-span-2"
        >
          <h3 className="text-xl font-semibold text-cyber-primary mb-4">Hydration Analysis</h3>
          <div className="space-y-2">
            <p className="text-cyber-light">Current Intake: <span className="text-neon-blue">{analysis.hydrationAnalysis.current}L</span></p>
            <p className="text-cyber-light">Recommended: <span className="text-neon-green">{analysis.hydrationAnalysis.recommended}L</span></p>
            <p className="text-cyber-light">
              Status: <span className={getStatusColor(analysis.hydrationAnalysis.status)}>{analysis.hydrationAnalysis.status}</span>
            </p>
            <div className="mt-4">
              <p className="text-cyber-light">Hydration Tips:</p>
              <ul className="list-disc list-inside text-cyber-light/80 text-sm">
                {(analysis.hydrationAnalysis.tips || []).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Symptoms and Recommendations */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={5}
          className="bg-cyber-dark/30 backdrop-blur-xl rounded-xl p-6 border border-cyber-primary/30 shadow-neon md:col-span-2"
        >
          <h3 className="text-xl font-semibold text-cyber-primary mb-4">Health Overview</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-cyber-primary">Reported Symptoms</h4>
              <p className="text-cyber-light/80">{data.symptoms || 'No symptoms reported'}</p>
            </div>
            <div>
              <h4 className="text-cyber-primary">General Recommendations</h4>
              <ul className="list-disc list-inside text-cyber-light/80 text-sm mt-2">
                {(analysis.generalHealth.recommendations || []).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={6}
        className="text-center mt-8"
      >
        <p className="text-cyber-light/80 text-sm">
          {analysis.generalHealth.status}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HealthInsights;
