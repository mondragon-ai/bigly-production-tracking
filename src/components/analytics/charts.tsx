"use clients";
import {ChartDateProps, NameValueProps} from "@/lib/types/analytics";
import styles from "../Shared.module.css";
import localFont from "next/font/local";
import {useState} from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {capitalizeWords} from "@/lib/utils/converter.tsx/text";
import {
  formatNumber,
  formatWithCommas,
} from "@/lib/utils/converter.tsx/numbers";

const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const CustomTooltip = ({
  active,
  payload,
  label,
  suffix,
  fixed,
  is_money,
  negative,
  prefix,
}: any) => {
  if (active && payload && payload.length) {
    const value = Number(payload[0].value);
    const v = value.toFixed(fixed);
    const header = is_money
      ? `${negative ? "-" : ""}${prefix}${formatWithCommas(Number(v))}`
      : v;
    return (
      <div className={styles.toolWrapper}>
        <p className="label">
          {`${label}: `}
          <span style={{fontWeight: 550}}>{`${header}${suffix}`}</span>
        </p>
      </div>
    );
  }
};

const CustomStackedTooltip = ({active, payload, label, suffix, fixed}: any) => {
  if (active && payload && payload.length) {
    const data = {
      subscription: 0,
      unsubscribed: 0,
    };

    return (
      <div className={styles.toolWrapper}>
        {payload.map((p: any) => {
          data[p.name as "subscription"] = Number(p.value);

          return (
            <p className="label">
              {`${capitalizeWords(p.name)}: `}
              <span style={{fontWeight: 550}}>{`${p.value}`}</span>
            </p>
          );
        })}
        <p className="label">
          {"Churn: "}
          <span style={{fontWeight: 550}}>{`${(data.subscription == 0
            ? 100
            : Number(data.unsubscribed / (data.subscription || 1)) * 100
          ).toFixed(2)}%`}</span>
        </p>
        <p>
          <span style={{fontWeight: 550}}>{label}</span>
        </p>
      </div>
    );
  }
};

const CustomComparedTooltip = ({
  active,
  payload,
  label,
  suffix,
  fixed,
}: any) => {
  if (active && payload && payload.length) {
    const data = {
      sales: 0,
      goal: 0,
    };

    return (
      <div className={styles.toolWrapper}>
        {payload.map((p: any) => {
          data[p.name as "sales"] = Number(p.value);

          return (
            <p className="label">
              {`${capitalizeWords(p.name)}: `}
              <span style={{fontWeight: 550}}>{`$${formatNumber(
                p.value,
              )}${suffix}`}</span>
            </p>
          );
        })}
        <p className="label">
          {"Progress: "}
          <span style={{fontWeight: 550}}>{`${(
            Number(data.sales / (data.goal || 1)) * 100
          ).toFixed(2)}%`}</span>
        </p>
      </div>
    );
  }
};

const CustomYAxisTick = (props: any) => {
  const {x, y, payload, suffix, fixed, is_money, negative, prefix} = props;

  const value = Number(payload.value);
  const v = value.toFixed(fixed);
  const header = is_money
    ? `${negative ? "-" : ""}${prefix}${formatNumber(Number(v))}`
    : v;

  return (
    <text
      x={x}
      y={y}
      dy={0}
      textAnchor="end"
      fill="rgb(112, 112, 123)"
      transform="rotate(0)"
      fontSize={"11px"}
    >
      {`${header}${suffix ? suffix : ""}`}{" "}
    </text>
  );
};

const CustomXAxisTick = (props: any) => {
  const {x, y, payload} = props;

  return (
    <text
      x={x}
      y={y + 15}
      dy={0}
      textAnchor="middle"
      fill="rgb(112, 112, 123)"
      transform="rotate(0)"
      fontSize={"11px"}
      alignmentBaseline="central"
    >
      {`${payload.value}`}
    </text>
  );
};

export const LineChartStats = ({
  data,
  suffix,
  fixed = 1,
  is_money,
  color = "#a1a5f4",
  negative,
  prefix = "",
}: {
  data: any[];
  suffix: "%" | "h" | "" | undefined;
  is_money?: boolean;
  fixed?: number;
  color?: string;
  negative?: boolean;
  prefix?: "$" | "";
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{top: 5, right: 5, left: -20, bottom: 5}}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c6beff" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="date"
          padding={{left: 10, right: 10}}
          axisLine={false}
          tickSize={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          padding={{top: 0, bottom: 40}}
          tickSize={0}
          tick={
            <CustomYAxisTick
              suffix={suffix}
              fixed={fixed}
              is_money={is_money}
              negative={negative}
              prefix={prefix}
            />
          }
        />
        <Tooltip
          content={
            <CustomTooltip
              suffix={suffix}
              fixed={fixed}
              is_money={is_money}
              negative={negative}
              prefix={prefix}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="value1"
          stroke="#5700d1"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#5700d1"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const BarChartStats = ({
  data,
  suffix,
  fixed = 1,
  is_money,
  color = "#a1a5f4",
  negative,
  prefix = "",
}: {
  data: any[];
  suffix: "%" | "h" | "" | undefined;
  is_money?: boolean;
  fixed?: number;
  color?: string;
  negative?: boolean;
  prefix?: "$" | "";
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{top: 5, right: 5, left: -5, bottom: 5}}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="name"
          padding={{left: 10, right: 10}}
          axisLine={false}
          tickSize={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          padding={{top: 10, bottom: 0}}
          type="number"
          tickSize={0}
          tick={
            <CustomYAxisTick
              suffix={suffix}
              fixed={fixed}
              is_money={is_money}
              negative={negative}
              prefix={prefix}
            />
          }
        />
        {/* <Tooltip /> */}
        <Tooltip
          content={
            <CustomTooltip
              suffix={suffix}
              fixed={fixed}
              is_money={is_money}
              negative={negative}
              prefix={prefix}
            />
          }
        />
        <Bar dataKey="value" fill={color} shape={<RoundedBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const StackedBarChart = ({
  data,
  suffix,
  fixed = 1,
  color = "#a1a5f4",
}: {
  data: any[];
  suffix: "%" | "h" | "" | undefined;
  fixed?: number;
  color?: string;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{top: 5, right: 5, left: -5, bottom: 5}}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="name"
          padding={{left: 10, right: 10}}
          axisLine={false}
          tickSize={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          padding={{top: 10, bottom: 0}}
          type="number"
          tickSize={0}
          tick={<CustomYAxisTick suffix={suffix} fixed={fixed} />}
        />

        <Tooltip
          content={<CustomStackedTooltip suffix={suffix} fixed={fixed} />}
        />
        <Bar
          dataKey="subscription"
          stackId="a"
          fill={color}
          shape={<RoundedBar fill={"#9CE76E"} is_stacked={true} />}
        />
        <Bar
          dataKey="unsubscribed"
          stackId="a"
          fill={color}
          shape={<RoundedBar fill={"#E85F5C"} is_stacked={true} />}
        />

        {/* <Legend /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ComparedBarChart = ({
  data,
  suffix,
  fixed = 1,
  color = "#a1a5f4",
  is_money,
  prefix,
}: {
  data: any[];
  suffix: "%" | "h" | "" | undefined;
  fixed?: number;
  color?: string;
  is_money?: boolean;
  prefix?: "$" | "";
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{top: 5, right: 5, left: -5, bottom: 5}}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="name"
          padding={{left: 10, right: 10}}
          axisLine={false}
          tickSize={0}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          axisLine={false}
          padding={{top: 10, bottom: 0}}
          type="number"
          tickSize={0}
          tick={
            <CustomYAxisTick
              suffix={suffix}
              fixed={fixed}
              is_money={is_money}
              negative={false}
              prefix={prefix}
            />
          }
        />

        <Tooltip
          content={<CustomComparedTooltip suffix={suffix} fixed={fixed} />}
        />
        <Bar
          dataKey="sales"
          fill={color}
          shape={<RoundedBar fill={"#9CE76E"} is_stacked={false} />}
        />
        <Bar
          dataKey="goal"
          fill={color}
          shape={<RoundedBar fill={"#A1A5F4"} is_stacked={false} />}
        />

        {/* <Legend /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

const RoundedBar = (props: any) => {
  const {fill, x, y, width, height, is_stacked} = props;

  if (width <= 0 || height <= 0) {
    return null;
  }

  const radius = is_stacked ? 0 : 6;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={radius}
      ry={radius}
    />
  );
};

export const PieChartStats = ({data}: {data: any[]}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{top: 5, right: 0, left: 0, bottom: 5}}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={renderActiveShape}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={"red"} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 13} dy={10} textAnchor="middle" fill={fill}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export const HalfCircleStats = ({
  data,
  completed,
}: {
  data: NameValueProps[];
  completed: number;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{top: 5, right: 0, left: 0, bottom: 5}}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={(p: any) => renderHalfShape(p, completed)}
          startAngle={180}
          endAngle={0}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={HALF_CIRCLE[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const HALF_CIRCLE = ["#a1a5f4", "#39393a"];

const renderHalfShape = (props: any, completed: number) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text
        x={"50%"}
        y={"70%"}
        dy={8}
        textAnchor="middle"
        fill={"#39393a"}
        fontSize="24px"
        fontWeight="bold"
        className={geistSans.className}
        letterSpacing="0px"
      >
        {`${(completed * 100).toFixed(0)}%`}
      </text>
      <text
        x={"50%"}
        y={"85%"}
        dy={4}
        textAnchor="middle"
        fill={"#39393a"}
        fontSize="12px"
        fontWeight="300"
        letterSpacing="0.2px"
      >
        completed
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};
