import { IItem } from './index';
import React, { useState } from 'react';

function EditTemplate(props: {
    initValue: string;
    apply: (value: string) => void;
    disable: () => void;
}) {
    const [value, setValue] = useState<string>(props.initValue);

    function handleKeydown(e: React.KeyboardEvent<HTMLDivElement>) {
        switch (e.key) {
            case 'Enter':
                props.apply(value);
                props.disable();
                break;
            case 'Escape':
                props.disable();
                break;
        }
    }

    return (
        <input
            value={value}
            onKeyDown={handleKeydown}
            onInput={(e) => setValue(e.currentTarget.value)}
        />
    );
}

function EditableItem(props: { item: IItem }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(props.item.name);

    return (
        <div>
            {''}
            {isEditMode ? (
                <EditTemplate
                    initValue={value}
                    apply={setValue}
                    disable={() => setIsEditMode(false)}
                />
            ) : (
                <div onClick={() => setIsEditMode(true)}>{value}</div>
            )}
        </div>
    );
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let data = [...props.initialData].sort((a, b) => (a.id > b.id ? 1 : 0));
    data = props.sorting == 'ASC' ? data : data.reverse();
    return (
        <div>
            {data.map((item) => (
                <EditableItem key={item.id} item={item} />
            ))}
        </div>
    );
}
