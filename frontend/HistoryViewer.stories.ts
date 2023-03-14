/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */

import HistoryViewer from './HistoryViewer.vue';
import fetchMock from 'fetch-mock';
import type {Meta, StoryFn} from "@storybook/vue3";

const mockEntries = [{
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
}];

export const NoHistory : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test', []);
  return {
    components: { HistoryViewer },
    template: '<HistoryViewer url="/test"/>',
  };
};

export const HttpError : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test', 404);
  return {
    components: { HistoryViewer },
    template: '<HistoryViewer url="/test"/>',
  };
};

export const Exception : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test', { throws: new Error('Some network error') });
  return {
    components: { HistoryViewer },
    template: '<HistoryViewer url="/test"/>',
  };
};

export const WithHistory : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test', mockEntries);
  return {
    components: { HistoryViewer },
    template: '<HistoryViewer url="/test"/>',
  };
};

export const FilteringOnTag : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test?tags=foo', mockEntries);
  return {
    components: { HistoryViewer },
    template: '<HistoryViewer url="/test" tags="foo"/>',
  };
};

export const OnlyOneMode : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test', mockEntries);
  return {
    components: { HistoryViewer },
    template: `<HistoryViewer url="/test" :modes="['horizontal']"/>`,
  };
};

export const TwoModesWithDefault : StoryFn<typeof HistoryViewer> = () => {
  fetchMock.restore().mock('/test', mockEntries);
  return {
    components: { HistoryViewer },
    template: `<HistoryViewer url="/test" :modes="['horizontal', 'vertical']" default-mode="vertical"/>`,
  };
};

export default {
  title: 'Global component',
  component: HistoryViewer,
} as Meta<typeof HistoryViewer>;
