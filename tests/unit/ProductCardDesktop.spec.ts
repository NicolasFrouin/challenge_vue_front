import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi } from 'vitest';
import ProductCardDesktop from '@/components/ProductCardDesktop.vue';

const product = {
  name: 'Sample Product',
  title: 'Sample Product Title',
  image: 'https://via.placeholder.com/300x300',
  description: 'Sample product description',
  price: 99.99,
};

describe('ProductCardDesktop.vue', () => {
  it('renders product information correctly', () => {
    const wrapper = shallowMount(ProductCardDesktop, {
      props: { product },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.find('img').attributes('src')).toBe(product.image);
    expect(wrapper.find('span').text()).toBe(product.name);
    expect(wrapper.find('.block.py-2').text()).toContain(product.description);
    expect(wrapper.find('.block.pb-2').text()).toContain(`${product.price}€`);
  });

  it('adds product to cart when button is clicked', async () => {
    const addProductMock = vi.fn();
    const wrapper = shallowMount(ProductCardDesktop, {
      props: { product },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              cart: { addProduct: addProductMock },
            },
          }),
        ],
      },
    });

    await wrapper.find('button').trigger('click');

    expect(addProductMock).toHaveBeenCalledWith(product);
  });
});
