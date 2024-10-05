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

const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const CustomTooltip = ({active, payload, label, suffix, fixed}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.toolWrapper}>
        <p className="label">
          {`${label}: `}
          <span
            style={{fontWeight: 550}}
          >{`${payload[0].value}${suffix}`}</span>
        </p>
        {/* <p className="intro">{`Value: ${
          isMoney ? "$" + payload[0].value : payload[0].value
        }`}</p> */}
      </div>
    );
  }
};

const CustomYAxisTick = (props: any) => {
  const {x, y, payload, suffix, fixed} = props;

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
      {`${Number(payload.value).toFixed(fixed)}${suffix ? suffix : ""}`}{" "}
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
}: {
  data: ChartDateProps[];
  suffix?: "%" | "h" | "";
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
          tick={<CustomYAxisTick suffix={suffix} />}
        />
        <Tooltip content={<CustomTooltip suffix={suffix} />} />
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
  color = "#a1a5f4",
}: {
  data: any[];
  suffix: "%" | "h" | "";
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
        {/* <Tooltip /> */}
        <Tooltip content={<CustomTooltip suffix={suffix} fixed={fixed} />} />
        <Bar dataKey="value" fill={color} shape={<RoundedBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const RoundedBar = (props: any) => {
  const {fill, x, y, width, height} = props;

  if (width <= 0 || height <= 0) {
    return null;
  }

  return (
    <rect x={x} y={y} width={width} height={height} fill={fill} rx={6} ry={6} />
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

export const HalfCircleStats = ({data}: {data: NameValueProps[]}) => {
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
          activeShape={renderHalfShape}
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

const renderHalfShape = (props: any) => {
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
        {`${(percent * 100).toFixed(0)}%`}
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