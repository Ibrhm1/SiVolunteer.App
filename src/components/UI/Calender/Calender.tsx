import { Button, Calendar } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import { IoTodayOutline } from "react-icons/io5";

const Calender = () => {
  const now = today(getLocalTimeZone());
  const defaultDate = today(getLocalTimeZone());
  const [value, setValue] = useState(defaultDate);

  return (
    <Calendar
      value={value}
      onChange={setValue}
      focusedValue={value}
      onFocusChange={setValue}
      aria-label="Date (Presets)"
      showMonthAndYearPickers
      bottomContent={
        <Button
          onPress={() => setValue(now)}
          size="sm"
          color="primary"
          variant="flat"
          className="text-medium w-full font-bold"
          startContent={<IoTodayOutline size={18} />}
        >
          Today
        </Button>
      }
    />
  );
};

export default Calender;
