import process from "node:process";
import { Box, render, Spacer, Static, Text, Transform, useApp, useFocus, useFocusManager, useInput, useStderr, useStdin, useStdout } from "ink";
import React, { useEffect, useState } from "react";
import { Colors } from "./ui/colors.js";
import { Footer } from "./ui/components/Footer.js";
import { Header } from "./ui/components/Header.js";
import { useGitBranchName } from "./ui/hooks/useGitBranchName.js";

interface ExampleProps {
  onBack: () => void;
}

const menuItems = [
  "Text",
  "Box",
  "Spacer",
  "Counter",
  "Static",
  "Transform",
  "Focus",
  "Stdio",
  "Exit",
];

const TextExample: React.FC<ExampleProps> = ({ onBack }) => {
  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>{"<Text> Component Examples"}</Text>
      <Text color={Colors.AccentGreen}>I am green</Text>
      <Text color="black" backgroundColor="white">I am black on white</Text>
      <Text color="#ffffff">I am white</Text>
      <Text bold>I am bold</Text>
      <Text italic>I am italic</Text>
      <Text underline>I am underline</Text>
      <Text strikethrough>I am strikethrough</Text>
      <Text inverse>I am inversed</Text>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

const BoxExample: React.FC<ExampleProps> = ({ onBack }) => {
  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>{"<Box> Component Examples"}</Text>
      <Box borderStyle="round" padding={1} margin={1}>
        <Text>This is a box.</Text>
      </Box>
      <Box borderStyle="double" borderColor={Colors.AccentGreen} paddingX={3}>
        <Text>This box has custom border and padding.</Text>
      </Box>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

const SpacerExample: React.FC<ExampleProps> = ({ onBack }) => {
  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>{"<Spacer> Component Example"}</Text>
      <Box>
        <Text>Left</Text>
        <Spacer />
        <Text>Right</Text>
      </Box>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

const CounterExample: React.FC<ExampleProps> = ({ onBack }) => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStars(previousStars => previousStars + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>{"<Counter> and useEffect Example"}</Text>
      <Text color={Colors.AccentGreen}>
        {stars}
        {" "}
        stars received! ✨
      </Text>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

const StaticExample: React.FC<ExampleProps> = ({ onBack }) => {
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    let completedTasks = 0;
    const timer = setInterval(() => {
      if (completedTasks++ < 10) {
        setTasks(previousTasks => [
          ...previousTasks,
          {
            id: previousTasks.length,
            title: `Task #${previousTasks.length + 1} completed`,
          },
        ]);
      } else {
        clearInterval(timer);
      }
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>{"<Static> Component Example"}</Text>
      <Static items={tasks}>
        {(task: { id: number; title: string }) => (
          <Box key={task.id}>
            <Text color={Colors.AccentGreen}>
              ✔
              {task.title}
            </Text>
          </Box>
        )}
      </Static>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

const TransformExample: React.FC<ExampleProps> = ({ onBack }) => {
  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>{"<Transform> Component Example"}</Text>
      <Transform transform={(output: string) => output.toUpperCase()}>
        <Text>This text will be transformed to uppercase.</Text>
      </Transform>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

interface FocusableItemProps {
  label: string;
  isFocused: boolean;
}

const FocusableItem: React.FC<FocusableItemProps> = ({ label, isFocused }) => (
  <Box>
    <Text color={isFocused ? Colors.AccentCyan : Colors.Foreground}>{label}</Text>
  </Box>
);

const FocusExample: React.FC<ExampleProps> = ({ onBack }) => {
  const { focus } = useFocusManager();
  const { isFocused: isFirstFocused } = useFocus({ id: "first" });
  const { isFocused: isSecondFocused } = useFocus({ id: "second" });
  const { isFocused: isThirdFocused } = useFocus({ id: "third" });

  useEffect(() => {
    focus("first");
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>useFocus & useFocusManager Example</Text>
      <Text>Use Tab and Shift+Tab to switch focus between items.</Text>
      <Box flexDirection="column" marginTop={1}>
        <FocusableItem label="First Input" isFocused={isFirstFocused} />
        <FocusableItem label="Second Input" isFocused={isSecondFocused} />
        <FocusableItem label="Third Input" isFocused={isThirdFocused} />
      </Box>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

const StdioExample: React.FC<ExampleProps> = ({ onBack }) => {
  const { write: writeToStdout } = useStdout();
  const { write: writeToStderr } = useStderr();

  useEffect(() => {
    writeToStdout("This is a message to stdout.\n");
    writeToStderr("This is a message to stderr.\n");
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color={Colors.AccentYellow}>useStdout & useStderr Example</Text>
      <Text>Check your terminal output. You should see messages on both stdout and stderr.</Text>
      <Text dimColor>These messages are written outside of Ink's render loop.</Text>
      <Box marginTop={1} borderStyle="round" borderColor={Colors.AccentCyan}>
        <Text color={Colors.AccentCyan}>Press Enter to go back</Text>
      </Box>
    </Box>
  );
};

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState("menu");
  const { isRawModeSupported } = useStdin();
  const { exit } = useApp();
  const currentDir = process.cwd();
  const branchName = useGitBranchName(currentDir);

  useInput((input, key) => {
    if (view !== "menu") {
      return;
    }

    if (key.upArrow) {
      setSelectedIndex(prevIndex => (prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1));
    }

    if (key.downArrow) {
      setSelectedIndex(prevIndex => (prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1));
    }

    if (key.return) {
      const selectedItem = menuItems[selectedIndex];
      if (selectedItem === "Exit") {
        exit();
      } else {
        setView(selectedItem.toLowerCase());
      }
    }
  });

  if (!isRawModeSupported) {
    return <Text>Raw mode is not supported. This app requires a TTY environment.</Text>;
  }

  const handleBack = () => setView("menu");

  if (view === "text") {
    return <TextExample onBack={handleBack} />;
  }
  if (view === "box") {
    return <BoxExample onBack={handleBack} />;
  }
  if (view === "spacer") {
    return <SpacerExample onBack={handleBack} />;
  }
  if (view === "counter") {
    return <CounterExample onBack={handleBack} />;
  }
  if (view === "static") {
    return <StaticExample onBack={handleBack} />;
  }
  if (view === "transform") {
    return <TransformExample onBack={handleBack} />;
  }
  if (view === "focus") {
    return <FocusExample onBack={handleBack} />;
  }
  if (view === "stdio") {
    return <StdioExample onBack={handleBack} />;
  }

  return (
    <Box flexDirection="column" width="90%">
      <Static items={[<Header key="header" />]}>
        {item => item}
      </Static>
      <Box flexDirection="column" borderStyle="round" borderColor={Colors.AccentBlue} padding={1}>
        <Text>Welcome to boot-ink! Use arrow keys to navigate, Enter to select.</Text>

        <Box flexDirection="column" marginTop={1}>
          {menuItems.map((item, index) => (
            <Text key={index} color={selectedIndex === index ? Colors.AccentCyan : Colors.Foreground}>
              {selectedIndex === index ? "> " : "  "}
              {item}
            </Text>
          ))}
        </Box>

        <Footer targetDir={currentDir} branchName={branchName} />
      </Box>
    </Box>
  );
}

render(<App />);
