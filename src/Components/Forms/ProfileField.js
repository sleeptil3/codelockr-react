export default function ProfileField({
	editMode,
	field,
	id,
	handleChange,
	value,
	data,
	type,
	autoComplete,
}) {
	return (
		<div className="w-full flex sm:flex-row flex-col items-baseline sm:space-x-4">
			<label htmlFor={id} className="shrink-0 text-xs font-normal">
				{field}:
			</label>
			{editMode ? (
				<input
					className="w-full focus:ring-0 bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 py-0 px-1 tracking-widest"
					type={type}
					autoComplete={autoComplete}
					name={id}
					id={id}
					value={value}
					onChange={handleChange}
				/>
			) : (
				<p className="text-md">{data}</p>
			)}
		</div>
	)
}
