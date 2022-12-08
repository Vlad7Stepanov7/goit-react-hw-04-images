import { Formik } from "formik";
import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import { CiSearch } from "react-icons/ci";
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit, notify }) => {
    
    const handleSubmit = (values, action) => {
        const { search } = values;
        if (search.trim() === '') {
            notify();
            return
        }
        onSubmit(search);
        action.resetForm();
    }

    return (
     <Header>
         <Formik
            initialValues={{ search: "" }}
            onSubmit={handleSubmit}
             >
            <SearchForm>
                <SearchFormButton type="submit">
                    <CiSearch size="24px"/>
                </SearchFormButton>
                <SearchFormInput
                  type="text"
                  name="search"
                  placeholder="Search images and photos"
                />
            </SearchForm>
        </Formik>
     </Header>
    )
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func,
    notify: PropTypes.func
}

export default Searchbar;