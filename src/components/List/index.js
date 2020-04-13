import React from 'react';
import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
	const { title, cards, done } = data;

	function getButton() {
		if (!data.creatable)
			return null;

		return (
			<button type="button">
				<MdAdd size={24} color={'#fff'} />
			</button>
		);
	}

	function getCards() {
		return cards.map((card, index) => (
			<Card
				key={card.id}
				listIndex={listIndex}
				index={index}
				data={card}
			/>)
		);
	}

	return (
		<Container done={done}>
			<header>
				<h2>{title}</h2>
				{getButton()}
			</header>

			<ul>
				{getCards()}
			</ul>
		</Container>
	);
};