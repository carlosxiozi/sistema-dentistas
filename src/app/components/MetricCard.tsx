"use client";

import { motion } from "framer-motion";
import React from "react";

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon }) => {
  

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col justify-between items-center text-center cursor-pointer"
    >
      <div className="text-4xl text-black mb-4">{icon}</div>
      <h2 className="text-2xl text-black font-bold">{value}</h2>
      <p className="text-black mt-2">{title}</p>
      <p className="text-sm text-blue-500 mt-1">{subtitle}</p>
    </motion.div>
  );
};

export default MetricCard;
