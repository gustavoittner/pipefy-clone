import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

const dragType = 'CARD';

export default function Card({ data, index, listIndex }) {
	const ref = useRef();
	const { move } = useContext(BoardContext);
	const { content, user, labels } = data;

	const [{ isDragging }, dragRef] = useDrag({
		item: {
			type: dragType,
			index,
			listIndex
		},
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});

	const [, dropRef] = useDrop({
		accept: dragType,
		hover(item, monitor) {
			const draggedListIndex = item.listIndex;
			const targetListIndex = listIndex;
			const draggedIndex = item.index;
			const targetIndex = index;
			let targetSize, targetCenter, draggedOffset, draggedTop;

			if (draggedIndex === targetIndex && draggedListIndex === targetListIndex)
				return;

			targetSize = ref.current.getBoundingClientRect();
			targetCenter = (targetSize.bottom - targetSize.top) / 2;
			draggedOffset = monitor.getClientOffset();
			draggedTop = draggedOffset.y - targetSize.top;

			if (draggedIndex < targetIndex && draggedTop < targetCenter)
				return;

			if (draggedIndex > targetIndex && draggedTop > targetCenter)
				return;

			move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

			item.index = targetIndex;
			item.listIndex = targetListIndex;
		}
	});

	dragRef(dropRef(ref));

	return (
		<Container ref={ref} isDragging={isDragging}>
			<header>
				{labels.map(label => <Label key={label} color={label} />)}
			</header>
			<p>{content}</p>
			{user && (
				<img src={user} alt="" />
			)}
		</Container>
	);
};