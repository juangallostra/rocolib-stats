import { createStyles, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconCircle } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
}));

interface CardGradientProps {
  title: string;
  description: string;
  difficultyColor: string;
}

export const CardGradient = ({
  title,
  description,
  difficultyColor,
}: CardGradientProps) => {
  const { classes } = useStyles();
  return (
    <Paper
      withBorder
      radius="md"
      className={classes.card}
      style={{ minWidth: "50%" }}
    >
      <Group>
        <ThemeIcon
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ deg: 0, from: difficultyColor, to: "white" }}
        >
          <IconCircle size={28} stroke={1.5} />
        </ThemeIcon>
        <Text size="md" weight={500}>
          {title}
        </Text>
      </Group>
      {renderDescription(description)}
      {/* <Text size="sm" mt="sm" color="dimmed">
        {description}
      </Text> */}
    </Paper>
  );
};

const renderDescription = (description: string) => {
  if (description) {
    return (
      <Text size="sm" mt="sm" color="dimmed">
        {description}
      </Text>
    );
  }
};
