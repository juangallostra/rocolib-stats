import {
  createStyles,
  ThemeIcon,
  Progress,
  Text,
  Group,
  Paper,
} from "@mantine/core";
import { IconPercentage } from "@tabler/icons";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface StatsCardProps {
  done: number;
  todo: number;
}

export const StatsCard = ({ done, todo }: StatsCardProps) => {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE / 3}>
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <IconPercentage size={34} stroke={1.5} />
      </ThemeIcon>

      <Text align="center" weight={700} className={classes.title}>
        Ticklist completion
      </Text>
      {/* <Text color='dimmed' align='center' size='sm'>
        32 km / week
      </Text> */}

      <Group position="apart" mt="xs">
        <Text size="sm" color="dimmed">
          Progress
        </Text>
        <Text size="sm" color="dimmed">
          {Math.round(100 * (Number.EPSILON + (100 * done) / (done + todo))) /
            100}{" "}
          %
        </Text>
      </Group>

      <Progress
        value={
          Math.round(100 * (Number.EPSILON + (100 * done) / (done + todo))) /
          100
        }
        mt={5}
      />

      <Group position="apart" mt="md">
        <Text size="sm">
          {done} / {done + todo} problems
        </Text>
        {/* <Badge size='sm'>4 days left</Badge> */}
      </Group>
    </Paper>
  );
};
