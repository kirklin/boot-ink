import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import React from "react";
import { getAsciiArtWidth, longBootInkLogo, shortBootInkLogo } from "../AsciiArt.js";
import { Colors } from "../colors.js";
import { useTerminalSize } from "../hooks/useTerminalSize.js";

interface HeaderProps {
  customAsciiArt?: string; // For user-defined ASCII art
}

export const Header: React.FC<HeaderProps> = ({
  customAsciiArt,
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
    </Box>
  );
};
