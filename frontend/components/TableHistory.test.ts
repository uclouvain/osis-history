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

import {expect, test} from 'vitest';
import {mount} from '@vue/test-utils';
import type {Entry} from "../interfaces";
import TableHistory from "./TableHistory.vue";

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


test('empty history', () => {
  const wrapper = mount(TableHistory, {
    props: {entries: []},
  });
  expect(wrapper.html()).toMatchSnapshot();
});

test('vertical history', () => {
  const wrapper = mount(TableHistory, {
    props: {entries: mockEntries},
  });
  expect(wrapper.html()).toMatchSnapshot();
});

test('horizontal history', () => {
  const wrapper = mount(TableHistory, {
    props: {entries: mockEntries, horizontal: true},
  });
  expect(wrapper.html()).toMatchSnapshot();
});

test('custom rendering with entries', () => {
  const wrapper = mount(TableHistory, {
    props: {
      entries: mockEntries,
      onHeadersRender: () => (`<tr><th>Foo</th></tr>`),
      onItemRender: (item: Entry) => (`<tr><td>${item.message}</td></tr>`),
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});

test('custom rendering empty', () => {
  const wrapper = mount(TableHistory, {
    props: {
      entries: [],
      onHistoryEmptyRender: () => (`<tr colspan="3"><td>Nope, nothing to display</td></tr>`),
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
