import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { Widget } from '../../services/intranetApi';
import type { DashboardDensity } from '../../state/dashboard';
import { WidgetCard } from './WidgetCard';
import styles from './adaptiveHome.module.css';

type WidgetGridProps = {
  widgets: Widget[];
  density: DashboardDensity;
  dataSource: 'api' | 'mock';
  onReorder: (nextOrder: string[]) => void;
  onRefresh: (widgetId: string) => void;
  onConfigure: (widgetId: string) => void;
  onHide: (widgetId: string) => void;
};

export function WidgetGrid({ widgets, density, dataSource, onReorder, onRefresh, onConfigure, onHide }: WidgetGridProps) {
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (widgets.length === 0) {
    return (
      <div className={styles.emptyState}>
        All widgets are hidden. Re-enable widgets from the personalisation panel to bring content back into view.
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      onDragStart={(event: DragStartEvent) => setActiveWidgetId(event.active.id as string)}
      onDragEnd={(event: DragEndEvent) => {
        setActiveWidgetId(null);
        const { active, over } = event;
        if (!over || active.id === over.id) {
          return;
        }
        const oldIndex = widgets.findIndex((widget) => widget.id === active.id);
        const newIndex = widgets.findIndex((widget) => widget.id === over.id);
        if (oldIndex === -1 || newIndex === -1) {
          return;
        }
        const nextOrder = arrayMove(widgets, oldIndex, newIndex).map((widget) => widget.id);
        onReorder(nextOrder);
      }}
      onDragCancel={() => setActiveWidgetId(null)}
    >
      <SortableContext items={widgets.map((widget) => widget.id)} strategy={rectSortingStrategy}>
        <div className={styles.grid} data-density={density} data-dragging={Boolean(activeWidgetId)}>
          {widgets.map((widget) => (
            <SortableWidgetCard
              key={widget.id}
              widget={widget}
              density={density}
              dataSource={dataSource}
              onRefresh={onRefresh}
              onConfigure={onConfigure}
              onHide={onHide}
              offline={dataSource === 'mock'}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

type SortableWidgetCardProps = {
  widget: Widget;
  density: DashboardDensity;
  dataSource: 'api' | 'mock';
  onRefresh: (widgetId: string) => void;
  onConfigure: (widgetId: string) => void;
  onHide: (widgetId: string) => void;
  offline: boolean;
};

function SortableWidgetCard({ widget, density, dataSource, onRefresh, onConfigure, onHide, offline }: SortableWidgetCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <WidgetCard
      ref={setNodeRef}
      widget={widget}
      dataSource={dataSource}
      density={density}
      style={style}
      isDragging={isDragging}
      isOffline={offline}
      dragHandleProps={{ attributes, listeners }}
      onRefresh={() => onRefresh(widget.id)}
      onConfigure={() => onConfigure(widget.id)}
      onHide={() => onHide(widget.id)}
    />
  );
}
