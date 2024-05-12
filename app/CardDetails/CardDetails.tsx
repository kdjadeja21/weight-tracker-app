"use client";
import { Card, Metric, Text, BadgeDelta, Flex } from "@tremor/react";

const CardDetails: React.FC = () => {
  return (
    <Card decoration="top">
      <Flex>
        <Metric>51</Metric>
      </Flex>
      <Text>Targeted Weight</Text>
    </Card>
  );
};

export default CardDetails;
