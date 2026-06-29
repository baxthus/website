<script>
  import { CF_PAGES_COMMIT_SHA, LICENSE_URL, REPO_URL } from '$app/env/public';

  import Badges from './badges.svelte';
</script>

<footer class="space-y-3.5">
  <hr />
  <Badges />
  <div>
    <p>
      Source code <a href={REPO_URL} target="_blank" rel="noopener noreferrer">available here</a>,
      released under the
      <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">GNU AGPLv3 license</a>
    </p>
    <p>
      Commit: {CF_PAGES_COMMIT_SHA}
    </p>
  </div>
</footer>
