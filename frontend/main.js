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
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import HistoryViewer from './HistoryViewer';

Vue.use(VueI18n);

const messages = {
  en: {
    date: 'Date',
    message_fr: 'Message in french',
    message_en: 'Message in english',
    author: 'Author',
    no_entry: "No history entry yet."
  },
  'fr-be': {
    date: 'Date',
    message_fr: 'Message en français',
    message_en: 'Message en anglais',
    author: 'Auteur',
    no_entry: "Aucun entrée d'historique pour le moment."
  }
}
const i18n = new VueI18n({
  locale: document.documentElement.lang,
  messages,
})

document.querySelectorAll('.history-viewer').forEach((elem) => {
  new Vue({
    render: (h) => h(HistoryViewer, {props: elem.dataset}),
    i18n,
  }).$mount(elem);
});
