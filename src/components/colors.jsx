const Color = ["#E2B4BD", "#93A8AC", "#424B54", "#3A5683", "#639A88"];

const Colorcomponent = (available) => {
	return (
		<div style={{ display: available }}>
			{Color.map(() => {
				<div
					style={{
						backgroundColor: Color,
						width: "100px",
						height: "100px",
						borderRadius: "50%",
					}}
				></div>;
			})}
		</div>
	);
};

export default Colorcomponent;
