#!/usr/bin/env node
import { createInterface } from 'node:readline/promises'
import { readFile, writeFile } from 'node:fs/promises'
import { stdin, stdout } from 'node:process'

const rl = createInterface({ input: stdin, output: stdout })

async function ask(question, def = '') {
  const answer = await rl.question(def ? `${question} (${def}): ` : `${question}: `)
  return answer.trim() || def
}

async function loadJson(path) {
  return JSON.parse(await readFile(path, 'utf-8'))
}

async function saveJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2) + '\n')
}

function nextId(items) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1
}

function splitList(raw) {
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

async function addPublication() {
  const path = 'src/data/publications.json'
  const list = await loadJson(path)
  const title = await ask('제목 (title)')
  const authors = splitList(await ask('저자 (콤마로 구분)'))
  const venue = await ask('학회/저널 (venue)')
  const year = Number(await ask('연도 (year)', String(new Date().getFullYear())))
  const thumbnail = await ask('썸네일 경로', '/images/publications/')
  const paper = await ask('논문 링크 (paper URL, 없으면 엔터)')
  const description = await ask('설명 (description)')

  list.unshift({
    id: nextId(list),
    title,
    authors,
    venue,
    year,
    thumbnail,
    links: paper ? { paper } : {},
    description,
  })
  await saveJson(path, list)
  console.log(`\n✅ ${path} 에 추가되었습니다.`)
}

async function addProject(kind) {
  const path = 'src/data/projects.json'
  const data = await loadJson(path)
  const list = data[kind]
  const title = await ask('제목 (title)')
  const description = await ask('설명 (description)')
  const image = await ask('이미지 경로 또는 URL', '/images/projects/')
  const technologies = splitList(await ask('기술 스택 (콤마로 구분)'))
  const github = await ask('GitHub 링크 (없으면 엔터)')
  const video = await ask('영상 링크 (없으면 엔터)')
  const paper = await ask('논문 링크 (없으면 엔터)')

  const links = {}
  if (github) links.github = github
  if (video) links.video = video
  if (paper) links.paper = paper

  list.push({ id: nextId(list), title, description, image, technologies, links })
  await saveJson(path, data)
  console.log(`\n✅ ${path} (${kind}) 에 추가되었습니다.`)
}

async function addGallery() {
  const path = 'src/data/gallery.json'
  const list = await loadJson(path)
  const title = await ask('제목 (title)')
  const description = await ask('설명 (description)')
  const image = await ask('이미지 경로', '/images/gallery/')
  const year = Number(await ask('연도 (year)', String(new Date().getFullYear())))

  list.unshift({ id: nextId(list), title, description, image, year })
  await saveJson(path, list)
  console.log(`\n✅ ${path} 에 추가되었습니다.`)
}

async function main() {
  console.log('무엇을 추가할까요?')
  console.log('  1) 논문 (publication)')
  console.log('  2) 주요 프로젝트 (major project)')
  console.log('  3) 토이 프로젝트 (toy project)')
  console.log('  4) 갤러리 사진 (gallery)')
  const choice = await ask('번호 선택')

  try {
    switch (choice) {
      case '1':
        await addPublication()
        break
      case '2':
        await addProject('major')
        break
      case '3':
        await addProject('toy')
        break
      case '4':
        await addGallery()
        break
      default:
        console.log('취소되었습니다.')
    }
  } finally {
    rl.close()
  }

  console.log('\n다음 단계:')
  console.log('  1. npm run dev 로 로컬에서 확인')
  console.log('  2. 필요하면 이미지를 public/images/ 아래에 추가')
  console.log('  3. git add -A && git commit -m "content: update" && git push')
  console.log('     (push하면 GitHub Actions가 자동으로 배포합니다)')
}

main()
