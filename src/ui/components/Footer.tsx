import { Box, Text } from "ink";
import React from "react";
import { Colors } from "../colors.js";
import { MemoryUsageDisplay } from "./MemoryUsageDisplay.js";

interface FooterProps {
  targetDir?: string;
  branchName?: string;
}

export const Footer: React.FC<FooterProps> = ({
  targetDir,
  branchName,
}) => {
  return (
    <Box marginTop={1} justifyContent="space-between" width="100%">
      <Box>
        <Text color={Colors.LightBlue}>
          {targetDir && targetDir}
          {branchName && (
            <Text color={Colors.Gray}>
              {" "}
              (
              {branchName}
              )
            </Text>
          )}
        </Text>
      </Box>

      <Box>
        <Text color={Colors.Gray}>
          Author: Kirk Lin (https://github.com/kirklin)
        </Text>
        <MemoryUsageDisplay />
      </Box>
    </Box>
  );
};
