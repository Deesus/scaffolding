import { shallowMount } from '@vue/test-utils';
import VPlaceholder from '@/components/Placeholder.vue';



describe('Placeholder.vue', () => {
    // -------------------- setup: --------------------
    let wrapper;
    const originalMessage = 'old message';

    beforeEach(() => {
        wrapper = shallowMount(VPlaceholder, {
            propsData: { msg: originalMessage }
        });
    });

    // -------------------- tests: --------------------
    it('renders the correct CSS class', () => {
        expect(wrapper.classes()).toContain('placeholder');
    });

    it('renders correct prop when passed', () => {
        const newMessage = 'meow';

        expect(wrapper.html()).not.toContain(newMessage);

        wrapper.setProps({ msg: newMessage });

        expect(wrapper.html()).toContain(newMessage);
        expect(wrapper.html()).not.toContain(originalMessage);

    });
});
