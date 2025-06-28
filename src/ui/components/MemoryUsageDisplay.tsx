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

      // 根据内存使用情况设置颜色
      if (usage >= 2 * 1024 * 1024 * 1024) {
        setMemoryUsageColor(Colors.AccentRed);
      } else if (usage >= 1 * 1024 * 1024 * 1024) {
        setMemoryUsageColor(Colors.AccentYellow);
      } else {
        setMemoryUsageColor(Colors.Gray);
      }
    };
    const intervalId = setInterval(updateMemory, 2000);
    updateMemory(); // Initial update
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box marginLeft={2}>
      <Text color={Colors.Gray}>| </Text>
      <Text color={memoryUsageColor}>{memoryUsage}</Text>
    </Box>
  );
};
