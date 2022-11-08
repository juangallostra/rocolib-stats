import { useState } from 'react';
import dayjs from 'dayjs';
import { createStyles, UnstyledButton, Text, Paper, Group } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconChartPie, IconChartPie2} from '@tabler/icons';
import { Boulder } from '../api';

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
    //   theme.colors[theme.primaryColor][7]
    // } 100%)`,
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.gray[0]} 0%, ${theme.colors.gray[2]
      } 100%)`,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.lg,
    // color: theme.colors[theme.primaryColor][6],
    color: theme.colors.gray[7],
  },

  stat: {
    minWidth: 98,
    paddingTop: theme.spacing.xl,
    minHeight: 140,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.white,
  },

  label: {
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.gray[6],
    lineHeight: 1.2,
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  day: {
    fontSize: 44,
    fontWeight: 700,
    // color: theme.white,
    color: theme.colors.gray[6],
    lineHeight: 1,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  month: {
    fontSize: theme.fontSizes.sm,
    // color: theme.white,
    color: theme.colors.gray[7],
    lineHeight: 1,
    textAlign: 'center',
  },

  controls: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing.xl * 2,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  date: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  control: {
    height: 28,
    width: '100%',
    // color: theme.colors[theme.primaryColor][2],
    color: theme.colors.gray[6],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    transition: 'background-color 50ms ease',

    [theme.fn.smallerThan('xs')]: {
      height: 34,
      width: 34,
    },

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan('xs')]: {
      transform: 'rotate(-90deg)',
    },
  },
}));

const data = [
  { label: 'Green', difficultyValue: 'green', },
  { label: 'Blue', difficultyValue: 'blue', },
  { label: 'Yellow', difficultyValue: 'yellow', },
  { label: 'Red', difficultyValue: 'red', },
];

// What the component receives
interface DailyStatsProps {
  sentProblems: Boulder[]
}

// filter the problems that were sent the specific day
function filterBySetDay(problems: Boulder[], day: Date): Boulder[] {
  return problems.filter(p => p.date_climbed.map(dateStr  => new Date(dateStr).toDateString()).includes(day.toDateString()))
}

function getBackground(stat: any, problems: Boulder[], date: Date): string {
  if (filterBySetDay(problems, date).filter(p => p.difficulty === stat.difficultyValue).length > 0) {
    if (stat.difficultyValue === 'green') {
      return '#40c057';
    }
    if (stat.difficultyValue ==='blue') {
      return '#228be6';
    }
    if (stat.difficultyValue ==='yellow') {
      return '#fab005';
    }
    if (stat.difficultyValue ==='red') {
      return '#fa5252';
    }
  }
  return 'white';
}

function getIcon(stat: any, problems: Boulder[], date: Date, classes: any) {
  if (filterBySetDay(problems, date).filter(p => p.difficulty === stat.difficultyValue).length > 0) {
    return <IconChartPie size={32} className={classes.icon} stroke={1.5} />
  }
  return <IconChartPie2 size={32} className={classes.icon} stroke={1.5} />

}

export const DailyStats = ({ sentProblems }: DailyStatsProps) => {
  const { classes } = useStyles();
  const [date, setDate] = useState(new Date());

  const stats = data.map((stat) => (
    <Paper style={{backgroundColor: getBackground(stat, sentProblems, date)}} className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>
      {/* <stat.icon size={32} className={classes.icon} stroke={1.5} /> */}
      {getIcon(stat, sentProblems, date, classes)}
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text size="xs" className={classes.count}>
          <span className={classes.value}>{filterBySetDay(sentProblems, date).filter(p => p.difficulty === stat.difficultyValue).length} problems</span> 
        </Text>
      </div>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'day').toDate())}
        >
          <IconChevronUp className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>

        <div className={classes.date}>
          <Text className={classes.day}>{dayjs(date).format('DD')}</Text>
          <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
        </div>

        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'day').toDate())}
        >
          <IconChevronDown className={classes.controlIcon} stroke={1.5} />
        </UnstyledButton>
      </div>
      <Group sx={{ flex: 1 }}>{stats}</Group>
    </div>
  );
}