import process from "node:process";
import { Box, Text } from "ink";
import React, { useEffect, useState } from "react";
import { Colors } from "../colors.js";
import { formatMemoryUsage } from "../utils/formatters.js";

export const MemoryUsageDisplay: React.FC = () => {
  const [memoryUsage, setMemoryUsage] = useState<string>("");
  const [memoryUsageColor, setMemoryUsageColor] = useState<string>(Colors.Gray);

  useEffect(() => {
    const updateMemory = () => {
      const usage = process.memoryUsage().rss;
      setMemoryUsage(formatMemoryUsage(usage));
      setMemoryUsageColor(
        usage >= 2 * 1024 * 1024 * 1024 ? Colors.AccentRed : Colors.Gray,
      );
    };
    const intervalId = setInterval(updateMemory, 2000);
    updateMemory(); // Initial update
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Text color={Colors.Gray}>| </Text>
      <Text color={memoryUsageColor}>{memoryUsage}</Text>
    </Box>
  );
};
