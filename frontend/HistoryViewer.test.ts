/*
 *
 * OSIS stands for Open Student Information System. It's an application
 * designed to manage the core business of higher education institutions,
 * such as universities, faculties, institutes and professional schools.
 * The core business involves the administration of students, teachers,
 * courses, programs and so on.
 *
 * Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * A copy of this license - GNU General Public License - is available
 * at the root of the source code of this program.  If not,
 * see http://www.gnu.org/licenses/.
 *
 */

import {beforeEach, expect, test} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import HistoryViewer from "./HistoryViewer.vue";
import type {Entry} from "./interfaces";
import fetchMock from "fetch-mock";

const apiUrl = "/api/dac97c6d-ddb9-47cf-bf72-913fa0ebbbfd/";
const mockEntries: Entry[] = [
  {
    author: 'John Doe',
    created: '06/04/2021 16:23',
    message: 'Ut molestiae aliquam tenetur est veritatis dolorum tempora. Eaque similique et qui ea consequatur illum dignissimos. Ullam qui vel qui quo. Ea dolor quasi quibusdam quia illum sunt aspernatur. Eveniet odio quos ad.',
  }, {
    author: 'Alice Smith',
    created: '03/04/2021 16:23',
    message: 'Nulla natus dolores dolor. Voluptatem numquam doloribus architecto non praesentium.\nSit facilis vitae sapiente. Placeat est qui et.',
  }, {
    author: 'Bob Martin',
    created: '01/04/2021 08:23',
    message: 'Corrupti <strong>reiciendis</strong> laboriosam repellat adipisci quis.\n\nIure omnis cum nihil accusantium ut doloribus nisi. Ut itaque suscipit et nulla iste enim. Assumenda quis et ullam temporibus quidem rerum nostrum. Rerum debitis quae qui ea molestiae animi minus optio.',
  }, {
    author: 'John Doe',
    created: '28/03/2021 10:00',
    message: '',
  },
];

beforeEach(() => {
  fetchMock.restore().mock(apiUrl, mockEntries);
});

test('no history', async () => {
  fetchMock.restore().mock(apiUrl, []);
  expect(HistoryViewer).toBeTruthy();

  const wrapper = mount(HistoryViewer, {
    props: {url: apiUrl},
  });
  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});

test('http error', async () => {
  fetchMock.restore().mock(apiUrl, 404);

  const wrapper = mount(HistoryViewer, {
    props: {url: apiUrl},
  });
  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});


test('exception', async () => {
  fetchMock.restore().mock(apiUrl, {throws: new Error('Some network error')});

  const wrapper = mount(HistoryViewer, {
    props: {url: apiUrl},
  });
  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});

test('with history', async () => {
  const wrapper = mount(HistoryViewer, {
    props: {url: apiUrl},
  });

  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});

test('filtering on tag only', async () => {
  fetchMock.restore().mock(`${apiUrl}?tags=foo`, mockEntries);

  const wrapper = mount(HistoryViewer, {
    props: {
      url: apiUrl,
      tags: 'foo',
      defaultMode: 'vertical',
    },
  });

  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});

test('two modes with bad default', async () => {
  const wrapper = mount(HistoryViewer, {
    props: {
      url: apiUrl,
      modes: ['table', 'horizontal'],
      defaultMode: 'foo',
    },
  });

  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
});

test('change modes', async () => {
  const wrapper = mount(HistoryViewer, {
    props: {url: apiUrl},
  });

  await flushPromises();
  const buttons = wrapper.findAll('.btn-default');
  expect(wrapper.findComponent({name: 'TableHistory'}).exists()).toBe(true);
  await buttons[1].trigger('click');
  expect(wrapper.findComponent({name: 'TimelineHistory'}).exists()).toBe(true);
  await buttons[0].trigger('click');
  expect(wrapper.findComponent({name: 'TableHistory'}).exists()).toBe(true);
  await buttons[2].trigger('click');
  expect(wrapper.findComponent({name: 'TimelineHistory'}).exists()).toBe(true);
});
