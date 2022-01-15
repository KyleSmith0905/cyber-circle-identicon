const isTouchingAny = (circle: ICircle, elements: ICircle[]): [boolean, ICircle] => {
	if (isOutside(circle)) return [true, circle];
	for (let i = 0; i < elements.length; i++)
		if (isTouching(circle, elements[i])) return [true, elements[i]];
	return [false, circle];
};

const isOutside = (circle: ICircle): boolean => {
	const distanceToEdge = Math.sqrt(Math.pow(circle.x, 2) + Math.pow(circle.y, 2));
	return 0.5 - circle.r * 0.5 - 0.01 < distanceToEdge;
};

const isTouching = (circleOne: ICircle, circleTwo: ICircle): boolean => {
	return (
		Math.pow(circleOne.x - circleTwo.x, 2) +
      Math.pow(circleOne.y - circleTwo.y, 2) <=
    0.01 + Math.pow((circleOne.r + circleTwo.r) / 2, 2)
	);
};

interface ICircle {
  x: number;
  y: number;
  r: number;
}

export { isTouchingAny, isOutside, isTouching };
export type { ICircle };
