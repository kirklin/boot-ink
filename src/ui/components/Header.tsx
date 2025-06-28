import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import React from "react";
import { getAsciiArtWidth, longBootInkLogo, shortBootInkLogo } from "../AsciiArt.js";
import { Colors } from "../colors.js";
import { useTerminalSize } from "../hooks/useTerminalSize.js";

interface HeaderProps {
  customAsciiArt?: string; // For user-defined ASCII art
  version?: string;
}

export const Header: React.FC<HeaderProps> = ({
  customAsciiArt,
  version = "v1.0.0",
}) => {
  const { columns: terminalWidth } = useTerminalSize();

  const widthOfLongLogo = getAsciiArtWidth(longBootInkLogo);

  let displayTitle;
  if (customAsciiArt) {
    displayTitle = customAsciiArt;
  } else {
    displayTitle = terminalWidth >= widthOfLongLogo ? longBootInkLogo : shortBootInkLogo;
  }

  const artWidth = getAsciiArtWidth(displayTitle);

  return (
    <Box
      flexDirection="column"
      marginBottom={1}
      alignItems="flex-start"
      width={artWidth}
      flexShrink={0}
    >
      {Colors.GradientColors
        ? (
            <Gradient colors={Colors.GradientColors}>
              <Text>{displayTitle}</Text>
            </Gradient>
          )
        : (
            <Text>{displayTitle}</Text>
          )}
      <Box width="100%" justifyContent="flex-end" marginTop={-1}>
        <Text color={Colors.Gray}>{version}</Text>
      </Box>
    </Box>
  );
};
