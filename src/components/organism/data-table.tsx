"use client"

import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  FilterIcon,
  InboxIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

// ── Types ────────────────────────────────────────────────────────────────────

type SortOrder = "ascend" | "descend"

interface FilterItem {
  text: string
  value: string | number | boolean
  children?: FilterItem[]
}

interface ColumnType<T> {
  title: string
  dataIndex?: keyof T & string
  key: string
  render?: (value: T[keyof T] | undefined, record: T, index: number) => React.ReactNode
  sorter?: (a: T, b: T) => number
  defaultSortOrder?: SortOrder
  filters?: FilterItem[]
  onFilter?: (value: string | number | boolean, record: T) => boolean
  filterMultiple?: boolean
  width?: string | number
  align?: "left" | "center" | "right"
  ellipsis?: boolean
  hidden?: boolean
  className?: string
}

interface ColumnGroupType<T> {
  title: string
  key: string
  children: ColumnType<T>[]
}

type ColumnDef<T> = ColumnType<T> | ColumnGroupType<T>

interface RowSelection<T> {
  type?: "checkbox" | "radio"
  selectedRowKeys?: React.Key[]
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string }
}

interface DataTableProps<T extends Record<string, unknown>> {
  dataSource: T[]
  columns: ColumnDef<T>[]
  rowSelection?: RowSelection<T>
  rowKey?: (keyof T & string) | ((record: T) => React.Key)
  size?: "sm" | "default" | "lg"
  bordered?: boolean
  showHeader?: boolean
  caption?: string
  empty?: React.ReactNode
  className?: string
  rowClassName?: (record: T, index: number) => string
  onChange?: (
    filters: Record<string, (string | number | boolean)[]>,
    sorter: { key: string; order: SortOrder } | null
  ) => void
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isColumnGroup<T>(col: ColumnDef<T>): col is ColumnGroupType<T> {
  return "children" in col && Array.isArray(col.children)
}

function flattenColumns<T>(columns: ColumnDef<T>[]): ColumnType<T>[] {
  return columns.flatMap((col) =>
    isColumnGroup(col) ? col.children : [col]
  )
}

function getRowKeyValue<T extends Record<string, unknown>>(
  record: T,
  rowKey: DataTableProps<T>["rowKey"],
  index: number
): React.Key {
  if (typeof rowKey === "function") return rowKey(record)
  if (typeof rowKey === "string") return record[rowKey] as React.Key
  if ("key" in record) return record.key as React.Key
  return index
}

const sizePadding = {
  sm: "px-2 py-1.5",
  default: "px-3 py-2.5",
  lg: "px-4 py-3.5",
} as const

const sizeText = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-sm",
} as const

// ── FilterDropdown ───────────────────────────────────────────────────────────

function FilterDropdown({
  filters,
  activeValues,
  multiple,
  onApply,
}: {
  filters: FilterItem[]
  activeValues: (string | number | boolean)[]
  multiple: boolean
  onApply: (values: (string | number | boolean)[]) => void
}) {
  const [selected, setSelected] = useState<(string | number | boolean)[]>(activeValues)
  const [open, setOpen] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setSelected(activeValues)
    }
    setOpen(nextOpen)
  }

  const handleToggle = (value: string | number | boolean) => {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      )
    } else {
      setSelected([value])
    }
  }

  const handleApply = () => {
    onApply(selected)
    setOpen(false)
  }

  const handleReset = () => {
    setSelected([])
    onApply([])
    setOpen(false)
  }

  const isActive = activeValues.length > 0

  function renderItems(items: FilterItem[]) {
    return items.map((item) => (
      <React.Fragment key={String(item.value)}>
        <label className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent">
          <Checkbox
            checked={selected.includes(item.value)}
            onCheckedChange={() => handleToggle(item.value)}
            className="size-3.5"
          />
          <span className="text-sm">{item.text}</span>
        </label>
        {item.children && (
          <div className="ml-4">{renderItems(item.children)}</div>
        )}
      </React.Fragment>
    ))
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "ml-1 inline-flex size-5 shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-accent",
            isActive && "text-primary"
          )}
        >
          <FilterIcon className="size-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-48 p-2">
        <div className="max-h-60 overflow-y-auto space-y-0.5">
          {renderItems(filters)}
        </div>
        <div className="mt-2 flex items-center gap-2 border-t pt-2">
          <Button variant="ghost" size="sm" className="flex-1 h-7 text-xs" onClick={handleReset}>
            Reset
          </Button>
          <Button size="sm" className="flex-1 h-7 text-xs" onClick={handleApply}>
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── SortIcon ─────────────────────────────────────────────────────────────────

function SortIcon({ order }: { order: SortOrder | null }) {
  if (order === "ascend") return <ArrowUpIcon className="size-3.5" />
  if (order === "descend") return <ArrowDownIcon className="size-3.5" />
  return <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/50" />
}

// ── DataTable ────────────────────────────────────────────────────────────────

function DataTable<T extends Record<string, unknown>>({
  dataSource,
  columns,
  rowSelection,
  rowKey = "key",
  size = "default",
  bordered = false,
  showHeader = true,
  caption,
  empty,
  className,
  rowClassName,
  onChange,
}: DataTableProps<T>) {
  const leafColumns = useMemo(() => flattenColumns(columns), [columns])
  const visibleLeafColumns = useMemo(
    () => leafColumns.filter((c) => !c.hidden),
    [leafColumns]
  )
  const hasGroups = useMemo(() => columns.some(isColumnGroup), [columns])

  // ── Sort state ──
  const [sortState, setSortState] = useState<{
    key: string
    order: SortOrder
  } | null>(() => {
    for (const col of visibleLeafColumns) {
      if (col.defaultSortOrder && col.sorter) {
        return { key: col.key, order: col.defaultSortOrder }
      }
    }
    return null
  })

  // ── Filter state ──
  const [filterState, setFilterState] = useState<
    Record<string, (string | number | boolean)[]>
  >({})

  // ── Selection state (uncontrolled fallback) ──
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<React.Key[]>([])
  const controlledSelection = rowSelection?.selectedRowKeys !== undefined
  const selectedKeys = controlledSelection
    ? rowSelection!.selectedRowKeys!
    : internalSelectedKeys

  const selectionType = rowSelection?.type ?? "checkbox"

  const getKey = useCallback(
    (record: T, index: number) => getRowKeyValue(record, rowKey, index),
    [rowKey]
  )

  // ── Data pipeline: filter → sort ──
  const processedData = useMemo(() => {
    let data = [...dataSource]

    // Apply filters
    for (const col of visibleLeafColumns) {
      const vals = filterState[col.key]
      if (vals && vals.length > 0 && col.onFilter) {
        data = data.filter((record) =>
          vals.some((v) => col.onFilter!(v, record))
        )
      }
    }

    // Apply sort
    if (sortState) {
      const col = visibleLeafColumns.find((c) => c.key === sortState.key)
      if (col?.sorter) {
        const multiplier = sortState.order === "ascend" ? 1 : -1
        data.sort((a, b) => col.sorter!(a, b) * multiplier)
      }
    }

    return data
  }, [dataSource, visibleLeafColumns, filterState, sortState])

  // ── Handlers ──
  const handleSort = (colKey: string) => {
    let nextSort: { key: string; order: SortOrder } | null
    if (!sortState || sortState.key !== colKey) {
      nextSort = { key: colKey, order: "ascend" }
    } else if (sortState.order === "ascend") {
      nextSort = { key: colKey, order: "descend" }
    } else {
      nextSort = null
    }
    setSortState(nextSort)
    onChange?.(filterState, nextSort)
  }

  const handleFilter = (colKey: string, values: (string | number | boolean)[]) => {
    const nextFilter = { ...filterState }
    if (values.length === 0) {
      delete nextFilter[colKey]
    } else {
      nextFilter[colKey] = values
    }
    setFilterState(nextFilter)
    onChange?.(nextFilter, sortState)
  }

  const handleSelectRow = (key: React.Key) => {
    let nextKeys: React.Key[]
    if (selectionType === "radio") {
      nextKeys = [key]
    } else {
      nextKeys = selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key]
    }

    if (!controlledSelection) setInternalSelectedKeys(nextKeys)
    const nextRows = processedData.filter((r, i) =>
      nextKeys.includes(getKey(r, i))
    )
    rowSelection?.onChange?.(nextKeys, nextRows)
  }

  const handleSelectAll = (checked: boolean) => {
    let nextKeys: React.Key[]
    if (checked) {
      nextKeys = processedData
        .filter((r) => {
          const props = rowSelection?.getCheckboxProps?.(r)
          return !props?.disabled
        })
        .map((r, i) => getKey(r, i))
    } else {
      nextKeys = []
    }

    if (!controlledSelection) setInternalSelectedKeys(nextKeys)
    const nextRows = processedData.filter((r, i) =>
      nextKeys.includes(getKey(r, i))
    )
    rowSelection?.onChange?.(nextKeys, nextRows)
  }

  const allSelectableKeys = useMemo(() => {
    return processedData
      .filter((r) => {
        const props = rowSelection?.getCheckboxProps?.(r)
        return !props?.disabled
      })
      .map((r, i) => getKey(r, i))
  }, [processedData, rowSelection, getKey])

  const allSelected =
    allSelectableKeys.length > 0 &&
    allSelectableKeys.every((k) => selectedKeys.includes(k))
  const someSelected =
    !allSelected && allSelectableKeys.some((k) => selectedKeys.includes(k))

  const totalLeafCols =
    visibleLeafColumns.length + (rowSelection ? 1 : 0)

  // ── Render header cell ──
  function renderHeaderCell(col: ColumnType<T>) {
    const hasSorter = !!col.sorter
    const hasFilter = col.filters && col.filters.length > 0
    const currentSort = sortState?.key === col.key ? sortState.order : null

    return (
      <div
        className={cn(
          "flex items-center gap-1",
          col.align === "center" && "justify-center",
          col.align === "right" && "justify-end"
        )}
      >
        {hasSorter ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            onClick={() => handleSort(col.key)}
          >
            <span>{col.title}</span>
            <SortIcon order={currentSort} />
          </button>
        ) : (
          <span>{col.title}</span>
        )}
        {hasFilter && (
          <FilterDropdown
            filters={col.filters!}
            activeValues={filterState[col.key] ?? []}
            multiple={col.filterMultiple !== false}
            onApply={(values) => handleFilter(col.key, values)}
          />
        )}
      </div>
    )
  }

  // ── Render header ──
  function renderHeader() {
    if (!showHeader) return null

    if (hasGroups) {
      return (
        <TableHeader>
          {/* Group row */}
          <TableRow>
            {rowSelection && (
              <TableHead
                rowSpan={2}
                className={cn(sizePadding[size], "w-10 align-middle")}
              >
                {selectionType === "checkbox" && (
                  <Checkbox
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    className="size-3.5"
                  />
                )}
              </TableHead>
            )}
            {columns
              .filter((c) => !("hidden" in c && c.hidden))
              .map((col) => {
                if (isColumnGroup(col)) {
                  const visibleChildren = col.children.filter((c) => !c.hidden)
                  return (
                    <TableHead
                      key={col.key}
                      colSpan={visibleChildren.length}
                      className={cn(
                        sizePadding[size],
                        sizeText[size],
                        "text-center font-semibold"
                      )}
                    >
                      {col.title}
                    </TableHead>
                  )
                }
                return (
                  <TableHead
                    key={col.key}
                    rowSpan={2}
                    className={cn(
                      sizePadding[size],
                      sizeText[size],
                      "align-middle",
                      col.width && "w-0"
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {renderHeaderCell(col)}
                  </TableHead>
                )
              })}
          </TableRow>
          {/* Leaf row under groups */}
          <TableRow>
            {columns.filter(isColumnGroup).flatMap((group) =>
              group.children
                .filter((c) => !c.hidden)
                .map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      sizePadding[size],
                      sizeText[size],
                      col.width && "w-0"
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {renderHeaderCell(col)}
                  </TableHead>
                ))
            )}
          </TableRow>
        </TableHeader>
      )
    }

    return (
      <TableHeader>
        <TableRow>
          {rowSelection && (
            <TableHead className={cn(sizePadding[size], "w-10")}>
              {selectionType === "checkbox" && (
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  className="size-3.5"
                />
              )}
            </TableHead>
          )}
          {visibleLeafColumns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(
                sizePadding[size],
                sizeText[size],
                col.align === "center" && "text-center",
                col.align === "right" && "text-right",
                col.width && "w-0"
              )}
              style={col.width ? { width: col.width } : undefined}
            >
              {renderHeaderCell(col)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    )
  }

  // ── Render body ──
  function renderBody() {
    if (processedData.length === 0) {
      return (
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={totalLeafCols} className="h-40">
              {empty ?? (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <InboxIcon className="size-10 stroke-1" />
                  <span className="text-sm">No data</span>
                </div>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      )
    }

    return (
      <TableBody>
        {processedData.map((record, rowIndex) => {
          const key = getKey(record, rowIndex)
          const isSelected = selectedKeys.includes(key)
          const checkboxProps = rowSelection?.getCheckboxProps?.(record)

          return (
            <TableRow
              key={key}
              data-state={isSelected ? "selected" : undefined}
              className={rowClassName?.(record, rowIndex)}
            >
              {rowSelection && (
                <TableCell className={cn(sizePadding[size], "w-10")}>
                  {selectionType === "checkbox" ? (
                    <Checkbox
                      checked={isSelected}
                      disabled={checkboxProps?.disabled}
                      onCheckedChange={() => handleSelectRow(key)}
                      className="size-3.5"
                    />
                  ) : (
                    <button
                      type="button"
                      disabled={checkboxProps?.disabled}
                      onClick={() => handleSelectRow(key)}
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border border-input shadow-xs transition-colors",
                        isSelected && "border-primary",
                        checkboxProps?.disabled && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {isSelected && (
                        <span className="size-2 rounded-full bg-primary" />
                      )}
                    </button>
                  )}
                </TableCell>
              )}
              {visibleLeafColumns.map((col) => {
                const value = col.dataIndex
                  ? record[col.dataIndex]
                  : undefined
                return (
                  <TableCell
                    key={col.key}
                    className={cn(
                      sizePadding[size],
                      sizeText[size],
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      col.ellipsis && "max-w-0 truncate",
                      col.className
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.render
                      ? col.render(value, record, rowIndex)
                      : (value as React.ReactNode) ?? "—"}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }

  return (
    <Table
      data-slot="data-table"
      className={cn(
        bordered && "rounded-lg border border-border [&_th]:border-r [&_td]:border-r [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0",
        className
      )}
    >
      {caption && <TableCaption>{caption}</TableCaption>}
      {renderHeader()}
      {renderBody()}
    </Table>
  )
}

export { DataTable }
export type {
  ColumnType,
  ColumnGroupType,
  ColumnDef,
  RowSelection,
  DataTableProps,
  FilterItem,
  SortOrder,
}
