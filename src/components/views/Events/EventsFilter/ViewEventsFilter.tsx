import { Controller } from "react-hook-form";
import useViewFilter from "./useViewFilter";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { cn } from "@/utils/cn";
import { IoFilterSharp } from "react-icons/io5";

const ViewEventsFilter = () => {
  const {
    currentCategory,
    currentIsOnline,
    handleChangeCategory,
    handleChangeIsOnline,
  } = useChangeUrl();
  const { control, setValue, dataCategory, isSuccessCategory } =
    useViewFilter();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
    }
  }, [isSuccessCategory]);

  return (
    <>
      <div className="hidden lg:block">
        <Accordion
          className="lg:sticky lg:top-20"
          variant="splitted"
          defaultSelectedKeys={["Filter"]}
        >
          <AccordionItem
            key="Filter"
            title={<p className="font-semibold">Filter</p>}
            startContent={<IoFilterSharp size={20} />}
          >
            {isSuccessCategory ? (
              <div className="space-y-2">
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      label="Category"
                      variant="bordered"
                      placeholder="Category"
                      labelPlacement="outside"
                      defaultSelectedKey={`${currentCategory}`}
                      defaultItems={dataCategory?.data.data || []}
                      onSelectionChange={(value) => {
                        onChange(value);
                        handleChangeCategory(value !== null ? `${value}` : "");
                      }}
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={category._id}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Select
                      {...field}
                      variant="bordered"
                      labelPlacement="outside"
                      label="Online or Offline"
                      placeholder="Online or Offline"
                      defaultSelectedKeys={[`${currentIsOnline}`]}
                      onChange={(e) => handleChangeIsOnline(e.target.value)}
                    >
                      <SelectItem key="true">Online</SelectItem>
                      <SelectItem key="false">Offline</SelectItem>
                    </Select>
                  )}
                />
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <Skeleton className="h-12 w-full rounded-xl lg:w-64" />
                <Skeleton className="h-12 w-full rounded-xl lg:w-64" />
              </div>
            )}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="lg:hidden block">
        <Accordion className="lg:sticky lg:top-20" variant="splitted">
          <AccordionItem
            title={<p className="font-semibold">Filter</p>}
            startContent={<IoFilterSharp size={20} />}
          >
            {isSuccessCategory ? (
              <div className="space-y-2">
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      label="Category"
                      variant="bordered"
                      placeholder="Category"
                      labelPlacement="outside"
                      defaultSelectedKey={`${currentCategory}`}
                      defaultItems={dataCategory?.data.data || []}
                      onSelectionChange={(value) => {
                        onChange(value);
                        handleChangeCategory(value !== null ? `${value}` : "");
                      }}
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={category._id}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Select
                      {...field}
                      variant="bordered"
                      labelPlacement="outside"
                      label="Online or Offline"
                      placeholder="Online or Offline"
                      defaultSelectedKeys={[`${currentIsOnline}`]}
                      onChange={(e) => handleChangeIsOnline(e.target.value)}
                    >
                      <SelectItem key="true">Online</SelectItem>
                      <SelectItem key="false">Offline</SelectItem>
                    </Select>
                  )}
                />
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <Skeleton className="h-12 w-full rounded-xl lg:w-64" />
                <Skeleton className="h-12 w-full rounded-xl lg:w-64" />
              </div>
            )}
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default ViewEventsFilter;
