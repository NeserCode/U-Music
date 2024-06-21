export const useConstant = () => {
	return {
		defaults: {
			listProfile: {
				id: `L${Math.round(Math.random() * 100000)}`,
				name: `Local#${Math.round(Math.random() * 100000)}`,

				createdAt: new Date(),
				updatedAt: new Date(),
			},
		},
		router: {
			alterExceptionRoutes: ["Home", "Setting"],
		},
	}
}
