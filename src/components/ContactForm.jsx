import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ContactContext } from "../context/ContactContext";
import styles from "./ContactForm.module.css";

const schema = yup.object().shape({
	firstName: yup.string().required("نام الزامی است."),
	lastName: yup.string().required("نام خانوادگی الزامی است."),
	email: yup.string().email("فرمت ایمیل معتبر نیست.").required("ایمیل الزامی است."),
	phone: yup.string().required("شماره تماس الزامی است.").matches(/^\d+$/, "شماره تماس باید فقط شامل ارقام باشد."),
});

const ContactForm = () => {
	const { dispatch, editTarget } = useContext(ContactContext);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (editTarget) {
			// پر کردن فرم هنگام ویرایش
			Object.entries(editTarget).forEach(([key, value]) => {
				setValue(key, value);
			});
		} else {
			reset();
		}
	}, [editTarget, setValue, reset]);

	const onSubmit = (data) => {
		if (editTarget) {
			dispatch({
				type: "EDIT_CONTACT",
				payload: { ...data, id: editTarget.id },
			});
			dispatch({ type: "CLEAR_EDIT" });
		} else {
			dispatch({
				type: "ADD_CONTACT",
				payload: {
					...data,
					id: crypto.randomUUID(),
				},
			});
		}
		reset();
	};

	const cancelEdit = () => {
		dispatch({ type: "CLEAR_EDIT" });
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
			<input {...register("firstName")} placeholder="نام" className={styles.input} />
			{errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}

			<input {...register("lastName")} placeholder="نام خانوادگی" className={styles.input} />
			{errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}

			<input {...register("email")} placeholder="ایمیل" className={styles.input} />
			{errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

			<input {...register("phone")} placeholder="شماره تماس" className={styles.input} />
			{errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}

			<button type="submit" className={styles.submitButton}>
				{editTarget ? "ذخیره ویرایش" : "افزودن مخاطب"}
			</button>

			{editTarget && (
				<button type="button" onClick={cancelEdit} className={styles.cancelButton}>
					انصراف از ویرایش
				</button>
			)}
		</form>
	);
};

export default ContactForm;
