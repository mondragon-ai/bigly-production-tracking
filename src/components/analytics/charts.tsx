"use clients";
import {ChartDateProps, NameValueProps} from "@/lib/types/analytics";
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

import localFont from "next/font/local";

// Import your local font
const geistSans = localFont({
  src: "../../app/fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const CustomTooltip = ({active, payload, label, isMoney}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}: ${payload[0].value}`}</p>
        {/* <p className="intro">{`Value: ${
          isMoney ? "$" + payload[0].value : payload[0].value
        }`}</p> */}
      </div>
    );
  }
};

const CustomYAxis = ({value, name}: any) => {
  return <div>hello</div>;
};

export const LineChartStats = ({
  data,
  isMoney,
}: {
  data: ChartDateProps[];
  isMoney?: boolean;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{top: 5, right: 0, left: -10, bottom: 5}}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0096C7" stopOpacity={0.5} />
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
          angle={90}
        />
        <YAxis
          axisLine={false}
          padding={{top: 0, bottom: 40}}
          tickSize={0}
          tickFormatter={(time) => {
            if (isMoney) {
              return `$${time}`;
            } else {
              return `${time}`;
            }
          }}
        />
        <Tooltip content={<CustomTooltip isMoney={isMoney} />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#0096C7"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const BarChartStats = ({data}: {data: any[]}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{top: 5, right: 0, left: -20, bottom: 5}}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          interval="preserveStartEnd"
          dataKey="name"
          padding={{left: 10, right: 10}}
          axisLine={false}
          tickSize={0}
        />
        <YAxis
          axisLine={false}
          padding={{top: 0, bottom: 10}}
          tick={<CustomYAxis />}
        />
        {/* <Tooltip /> */}
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#0096C7" />
      </BarChart>
    </ResponsiveContainer>
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
