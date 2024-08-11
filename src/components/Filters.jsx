import { Form, Link, useLoaderData } from "react-router-dom"
import { FormCheckbox, FormInput, FormRange, FormSelect } from ".";

function Filters() {

  const { meta: { companies, categories }, params } = useLoaderData();
  
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/**SEARCH */ }
      <FormInput type={ 'search' } label={ 'Search Product' } name={ 'search' }
        size={ 'input-sm' }
        defaultValue={ search }
      />
      {/**CATEGORIES */ }
      <FormSelect label={ 'Select Category' } name={ 'category' } list={ categories } size={ 'select-sm' } defaultValue={ category } />
      {/**COMPANIES */ }
      <FormSelect label={ 'Select Company' } name={ 'company' } list={ companies } size='select-sm' defaultValue={ company } />
      {/**ORDER */ }
      <FormSelect label={ 'Sort by' } name={ 'order' } list={ [ 'a-z', 'z-a', 'high', 'low' ] } size='select-sm' defaultValue={ order } />

      {/**PRICE RANGE INPUT */}
      <FormRange name={'price'} label={'Select Price'} size={'range-sm'} price={ price } />

      {/**SHOPPING CHECKBOX */}
      <FormCheckbox label={'Free Shiping'} name={'shipping'} size={'checkbox-sm'} defaultValue={ shipping } />
      {/**BUTTONS */ }
      <button type="submit"
        className="btn btn-primary btn-sm"
      >
        search
      </button>
      <Link to='/products' className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  )
}

export default Filters
