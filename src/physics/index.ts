import { ElementData } from "../interface";
import { pythagorean } from "../utils";

interface Circle {
  x: number;
  y: number;
  r: number;
}

const setElements = (elements: ElementData[]): Circle[] => {
	let newElements = [];
	for (let i = 0; i < elements.length; i++) {
		const inverseSize = Math.pow(i + 5, -0.6);
		let circle = {
			r: inverseSize,
			x: elements[i].x,
			y: elements[i].y,
		};
		let [touching, conflictCircle] = isTouchingAny(circle, newElements);
		if (touching) {
			for (let j = 0; j < 4 && touching; j++) {
				circle = tryFixCircle(circle, conflictCircle);
				[touching, conflictCircle] = isTouchingAny(circle, newElements);
			}
		}
		if (!touching) newElements.push(circle);
	}

	newElements = newElements.map(circle => {
		circle.x += 0.5;
		circle.y += 0.5;
		return circle;
	});

	return newElements;
};

const isTouchingAny = (circle: Circle, elements: Circle[]): [boolean, Circle] => {
	if (isOutside(circle)) return [true, circle];
	for (let i = 0; i < elements.length; i++)
		if (isTouching(circle, elements[i])) return [true, elements[i]];
	return [false, circle];
};

const isOutside = (circle: Circle): boolean => {
	const distanceToEdge = pythagorean(circle.x, circle.y);
	return 0.5 - circle.r * 0.5 - 0.01 < distanceToEdge;
};

const isTouching = (circleOne: Circle, circleTwo: Circle): boolean => {
	const distanceSum = Math.pow(circleOne.x - circleTwo.x, 2) + Math.pow(circleOne.y - circleTwo.y, 2);

	const radiusSum = Math.pow((circleOne.r + circleTwo.r) / 2, 2);

	return (
		distanceSum <= 0.01 + radiusSum
	);
};

const tryFixCircle = (circleMain: Circle, circleOther: Circle): Circle => {
	if (circleMain === circleOther) {
		const escapeAngle = Math.atan2(circleMain.y, circleMain.x);
		circleMain.x = Math.cos(escapeAngle) * (circleMain.r * 0.5 - 0.01);
		circleMain.y = Math.sin(escapeAngle) * (circleMain.r * 0.5 - 0.01);
	} 
	else {
		const escapeAngle = Math.atan2( circleMain.y - circleOther.y, circleMain.x - circleOther.x);
		circleMain.x =
      Math.cos(escapeAngle) * (circleMain.r + circleOther.r + 0.04) * 0.5 +
      circleOther.x;
		circleMain.y =
      Math.sin(escapeAngle) * (circleMain.r + circleOther.r + 0.04) * 0.5 +
      circleOther.y;
	}

	return circleMain;
};

export default setElements;