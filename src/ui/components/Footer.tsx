import { Box, Text } from "ink";
import React from "react";
import { Colors } from "../colors.js";
import { useTerminalSize } from "../hooks/useTerminalSize.js";
import { MemoryUsageDisplay } from "./MemoryUsageDisplay.js";

interface FooterProps {
  targetDir?: string;
  branchName?: string;
}

export const Footer: React.FC<FooterProps> = ({
  targetDir,
  branchName,
}) => {
  const { columns: terminalWidth } = useTerminalSize();
  const contentWidth = Math.floor(terminalWidth * 0.9);

  return (
    <Box flexDirection="column" width={contentWidth}>
      <Box marginTop={1} justifyContent="space-between" width="100%">
        <Box>
          {targetDir && (
            <Text color={Colors.LightBlue}>
              <Text color={Colors.Gray}>📁 </Text>
              {targetDir}
            </Text>
          )}
          {branchName && (
            <Text color={Colors.Gray}>
              {" "}
              <Text color={Colors.AccentPurple}>⎇ </Text>
              <Text color={Colors.AccentCyan}>{branchName}</Text>
            </Text>
          )}
        </Box>

        <Box>
          <Text color={Colors.Gray}>
            <Text color={Colors.AccentGreen}>✦ </Text>
            Kirk Lin (https://github.com/kirklin)
          </Text>
          <MemoryUsageDisplay />
        </Box>
      </Box>
    </Box>
  );
};
